// Initialized: src/hooks/useTimer.ts
const [count, setCount] = useState(0);
export const Button = () => {
  return <button>Click me</button>;
}
// 2025-07-13 13:32:35 | edit #6
// 2025-07-13 13:32:58 | edit #7
useEffect(() => {
  console.log('Mounted');
}, []);
// 2025-07-13 13:36:45 | edit #14
const [count, setCount] = useState(0);
// 2025-07-13 13:37:59 | edit #16
// Debug: check state flow
console.log('State updated');
// 2025-07-13 13:38:39 | edit #17
export const Button = () => {
  return <button>Click me</button>;
}
