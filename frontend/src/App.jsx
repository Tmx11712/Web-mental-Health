import "./index.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Issues from "./components/Issues";
import Articles from "./components/Articles";
import Polling from "./components/Polling";
import FormLaporan from "./components/FormLaporan";
import Emergency from "./components/Emergency";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Issues />
      <Articles />
      <Polling />
      <FormLaporan />
      <Emergency />
      <Footer />
    </>
  );
}

export default App;