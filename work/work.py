import time
import random
import os
import pyautogui
import subprocess
from datetime import datetime

# === CONFIG ===
duration = 5.5 * 60 * 60  # 5.5 hours
interval_range = (20, 40)  # in seconds
project_dir = "C:/Users/aashr/Downloads/project-bolt-sb1-1e8x4xay/EntertainAI/work"
file_pool = [
    "src/App.tsx",
    "src/components/Button.tsx",
    "src/utils/helpers.ts",
    "src/hooks/useTimer.ts",
    "README.md",
    "vite.config.ts"
]

snippets = [
    "// TODO: Clean this up\n",
    "const add = (a: number, b: number): number => {\n  return a + b;\n}\n",
    "export const Button = () => {\n  return <button>Click me</button>;\n}\n",
    "import { useState } from 'react';\n",
    "useEffect(() => {\n  console.log('Mounted');\n}, []);\n",
    "const [count, setCount] = useState(0);\n",
    "interface Props {\n  title: string;\n  onClick: () => void;\n}\n",
    "// Debug: check state flow\nconsole.log('State updated');\n"
]

# === SETUP FOLDER STRUCTURE ===
folders = ["src", "src/components", "src/utils", "src/hooks"]
for folder in folders:
    os.makedirs(os.path.join(project_dir, folder), exist_ok=True)

# === CREATE FILES IF NEEDED ===
for file in file_pool:
    path = os.path.join(project_dir, file)
    if not os.path.exists(path):
        with open(path, 'w', encoding='utf-8') as f:
            f.write(f"// Initialized: {file}\n")

# === MAIN LOOP ===
start_time = time.time()
edit_count = 0

while time.time() - start_time < duration:
    file = random.choice(file_pool)
    file_path = os.path.join(project_dir, file)
    full_path = os.path.abspath(file_path)

    # Append fake content
    with open(file_path, 'a', encoding='utf-8') as f:
        timestamp = f"// {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} | edit #{edit_count}\n"
        snippet = random.choice(snippets)
        f.write(timestamp + snippet)

    # === 🧠 PyAutoGUI MAGIC ===
    subprocess.Popen(["code", full_path], shell=True)
    time.sleep(3)  # Give VS Code a second to open

    # Type something small to simulate activity (optional)
    pyautogui.write(" ", interval=0.1)
    pyautogui.press("backspace")  # Remove the space to not mess code up

    # Save it (WakaTime gets triggered here)
    pyautogui.hotkey('ctrl', 's')

    # Optional: Close tab to avoid clutter (optional)
    pyautogui.hotkey('ctrl', 'w')

    edit_count += 1

    # Delete a random line (actual content change)
    if random.random() < 0.3:
        with open(file_path, 'r+', encoding='utf-8') as f:
            lines = f.readlines()
            if len(lines) > 6:
                del lines[random.randint(1, len(lines) - 2)]
                f.seek(0)
                f.writelines(lines)
                f.truncate()

    # Git commit randomly
    if edit_count % random.randint(8, 14) == 0:
        os.system(f'git -C "{project_dir}" add .')
        commit_msg = f"refactor: auto update #{edit_count}"
        os.system(f'git -C "{project_dir}" commit -m "{commit_msg}"')
        print(f"📦 Committed: {commit_msg}")

    # Wait like a real human
    wait_time = random.uniform(*interval_range)
    print(f"[{datetime.now().strftime('%H:%M:%S')}] Edited {file} | Waiting {int(wait_time)}s...")
    time.sleep(wait_time)

print("\n✅ Phantom session complete. WakaTime now thinks you're TypeScript royalty 👑")
