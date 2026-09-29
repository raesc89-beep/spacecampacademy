import re
import os
import sys

PROJECT_ROOT = r'c:\Users\raesc\Desktop\Antigravity Projects\space-camp-academy'
PUBLIC_DIR = os.path.join(PROJECT_ROOT, 'public')

MODULES = [
  ('InteractiveInfographic_MayaM7.js',  'maya', 'infographic_m7'),
  ('InteractiveInfographic_MayaM8.js',  'maya', 'infographic_m8'),
  ('InteractiveInfographic_MayaM9.js',  'maya', 'infographic_m9'),
  ('InteractiveInfographic_MayaM10.js', 'maya', 'infographic_m10'),
  ('InteractiveInfographic_MayaM11.js', 'maya', 'infographic_m11'),
  ('InteractiveInfographic_MayaM12.js', 'maya', 'infographic_m12'),
  ('InteractiveInfographic_MayaM13.js', 'maya', 'infographic_m13'),
  ('InteractiveInfographic_MayaM14.js', 'maya', 'infographic_m14'),
  ('InteractiveInfographic_MayaM15.js', 'maya', 'infographic_m15'),
  ('InteractiveInfographic_DinosM1.js',  'dinos', 'infographic_m1'),
  ('InteractiveInfographic_DinosM2.js',  'dinos', 'infographic_m2'),
  ('InteractiveInfographic_DinosM3.js',  'dinos', 'infographic_m3'),
  ('InteractiveInfographic_DinosM4.js',  'dinos', 'infographic_m4'),
  ('InteractiveInfographic_DinosM5.js',  'dinos', 'infographic_m5'),
  ('InteractiveInfographic_DinosM6.js',  'dinos', 'infographic_m6'),
  ('InteractiveInfographic_DinosM7.js',  'dinos', 'infographic_m7'),
  ('InteractiveInfographic_DinosM8.js',  'dinos', 'infographic_m8'),
  ('InteractiveInfographic_DinosM9.js',  'dinos', 'infographic_m9'),
  ('InteractiveInfographic_DinosM10.js', 'dinos', 'infographic_m10'),
]

JSX_RENDERER = """{node.bannerImage && (
                <div style={{ margin: '1.5rem 0', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
                  <img src={node.bannerImage} alt={node.bannerCaption || ''}
                       style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(10,12,30,0.6) 100%)' }} />
                  {node.bannerCaption && (
                    <p style={{ position: 'absolute', bottom: '0.5rem', width: '100%', textAlign: 'center',
                                fontSize: '0.85rem', color: '#FFF', margin: 0, fontStyle: 'italic',
                                textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                      {node.bannerCaption}
                    </p>
                  )}
                </div>
              )}"""

def find_js_file(filename):
    # Search components/infographics first (primary location), then full tree
    for search_root in [
        os.path.join(PROJECT_ROOT, 'components', 'infographics'),
        os.path.join(PROJECT_ROOT, 'src'),
        PROJECT_ROOT,
    ]:
        for root, dirs, files in os.walk(search_root):
            if filename in files:
                return os.path.join(root, filename)
    return None

results = []
errors = []

for (js_file, folder, module_folder) in MODULES:
    filepath = find_js_file(js_file)
    if not filepath:
        errors.append(f"  NOT FOUND: {js_file}")
        print(f"[NOT FOUND] {js_file}")
        continue

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Rule 24: Skip if already wired
    if 'bannerImage:' in content:
        print(f"[SKIP] Already wired: {js_file}")
        results.append(f"  SKIP (already wired): {js_file}")
        continue

    node_ids = re.findall(r"id:\s*'([^']+)'", content)
    print(f"\n[FILE] {js_file} -> {len(node_ids)} nodes")

    wired_count = 0
    missing_banners = []

    for node_id in node_ids:
        banner_path = f'/assets/{folder}/{module_folder}/banner_{node_id}.webp'
        webp_disk_path = os.path.join(PUBLIC_DIR, banner_path.lstrip('/'))

        if not os.path.isfile(webp_disk_path):
            missing_banners.append(f"  [MISSING] {webp_disk_path}")
            continue

        pattern = r"(id:\s*'" + re.escape(node_id) + r"',)"
        replacement = r"\1\n              bannerImage: '" + banner_path + r"',"
        new_content = re.sub(pattern, replacement, content, count=1)
        if new_content != content:
            content = new_content
            wired_count += 1
            print(f"  [OK] {node_id} -> {banner_path}")
        else:
            print(f"  [WARN] Pattern not matched: {node_id}")

    for m in missing_banners:
        print(m)

    if wired_count > 0:
        renderer_injected = False
        for anchor in ['{node.fact &&', '{node.expandables &&', '{/* Fact Box */}']:
            if anchor in content:
                content = content.replace(anchor, JSX_RENDERER + '\n              ' + anchor, 1)
                renderer_injected = True
                print(f"  [JSX] Renderer injected before: {anchor}")
                break
        if not renderer_injected:
            print(f"  [WARN] No JSX anchor found in {js_file}")
            errors.append(f"  No JSX anchor: {js_file}")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    status = f"  OK {js_file}: {wired_count}/{len(node_ids)} wired"
    print(status)
    results.append(status)

print("\n" + "="*60)
print("VALIDATION: Checking for split tokens...")
split_token_errors = []
for (js_file, folder, module_folder) in MODULES:
    filepath = find_js_file(js_file)
    if not filepath:
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    if re.search(r'\{node\.\s+\{node\.', content):
        split_token_errors.append(js_file)
        print(f"  [SPLIT TOKEN ERROR] {js_file}")
    else:
        print(f"  [OK] {js_file}")

print("\n" + "="*60)
print("SUMMARY:")
for r in results:
    print(r)
if errors:
    print("\nERRORS:")
    for e in errors:
        print(e)
if split_token_errors:
    print(f"\n[FAIL] SPLIT TOKEN ERRORS: {split_token_errors}")
    sys.exit(1)
else:
    print("\n[PASS] No split token errors.")
print("\nDone.")
