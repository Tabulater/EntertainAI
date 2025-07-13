// Initialized: src/components/Button.tsx
// 2025-07-13 13:29:22 | edit #0
  title: string;
  onClick: () => void;
}
// 2025-07-13 13:32:05 | edit #5
useEffect(() => {
  console.log('Mounted');
}, []);
// 2025-07-13 13:34:13 | edit #9
const add = (a: number, b: number): number => {
  return a + b;
}
// 2025-07-13 13:35:22 | edit #11
const add = (a: number, b: number): number => {
  return a + b;
}
// 2025-07-13 13:43:34 | edit #26
console.log('State updated');
// 2025-07-13 13:46:05 | edit #30
export const Button = () => {
  return <button>Click me</button>;
}
