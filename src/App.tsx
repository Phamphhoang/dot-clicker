import "./App.css";

import GameBoard from "./components/GameBoard";

function App() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className=" m-6 text-6xl font-extrabold text-transparent bg-clip-text  drop-shadow-xl"
      style={{color:"#4C70BC"}}>
        Game Click
      </h1>
      <GameBoard />
      <footer className="bg-gradient-to-r from-gre-400 to-blue-500 text-white py-6 mt-12">
        <div className="max-w-screen-lg mx-auto text-center">
          <p className="text-sm" style={{color:"#FFFEFF"}}>
            Created by{" "}
            <span className="font-semibold text-red-400" style={{color:"#4C70BC"}}>HoangPham</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
