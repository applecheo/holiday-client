const SERVER = import.meta.env.VITE_SERVER;

fetch(SERVER)
  .then((response) => response.json())
  .then((data) => console.log(data));

function App() {
  return (
    <div>
      <h1>Holidays</h1>
    </div>
  );
}

export default App;
