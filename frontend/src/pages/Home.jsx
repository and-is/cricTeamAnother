const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-3xl font-bold">Cricket Management System</h1>
          <nav>
            <a href="#about" className="px-4">
              About
            </a>
            <a href="#features" className="px-4">
              Features
            </a>
            <a href="#contact" className="px-4">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section id="hero" className="text-center py-16">
          <h2 className="text-4xl font-bold mb-4">
            Welcome to the Cricket Management System
          </h2>
          <p className="text-xl mb-8">
            Manage your cricket team, players, and matches with ease.
          </p>
          <a
            href="#features"
            className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg"
          >
            Explore Features
          </a>
        </section>

        <section id="about" className="py-16">
          <h3 className="text-3xl font-bold mb-6 text-center">About Us</h3>
          <p className="text-lg text-center max-w-2xl mx-auto">
            The Cricket Management System is designed to simplify the management
            of cricket teams, player statistics, and match details. Our goal is
            to provide an easy-to-use platform for cricket enthusiasts, coaches,
            and team managers to keep track of everything in one place.
          </p>
        </section>

        <section id="features" className="py-16 bg-gray-200">
          <h3 className="text-3xl font-bold mb-6 text-center">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h4 className="text-2xl font-bold mb-4">Team Management</h4>
              <p className="text-lg">
                Create and manage teams, assign coaches, and keep track of team
                performance.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h4 className="text-2xl font-bold mb-4">Player Statistics</h4>
              <p className="text-lg">
                Record and view player statistics, including runs, wickets, and
                catches.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h4 className="text-2xl font-bold mb-4">Match Details</h4>
              <p className="text-lg">
                Schedule matches, record scores, and determine match outcomes.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="py-16">
          <h3 className="text-3xl font-bold mb-6 text-center">Contact Us</h3>
          <form className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-lg font-medium mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg"
            >
              Send Message
            </button>
          </form>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-4 text-center">
        &copy; Andis Paudel, Manorath Bhatt <br /> {new Date().getFullYear()}{" "}
        Cricket Management System. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
