// Initialized: README.md
// 2025-07-13 13:31:02 | edit #3
// Debug: check state flow
// 2025-07-13 13:33:37 | edit #8
interface Props {
  title: string;
  onClick: () => void;
}
// 2025-07-13 13:40:51 | edit #21
useEffect(() => {
  console.log('Mounted');
}, []);
