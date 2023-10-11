import {
  faEnvelopeOpenText,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Contact = () => {
  return (
    <section className="w-full bg-gray-100 p-8 pt-1">
      <div className="container mx-auto">
        <div className="text-center pt-4 mt-3 pb-3">
          <h1 className="text-3xl text-gray-700">Contact Us</h1>
        </div>

        <div className="flex flex-wrap justify-between pb-5 mb-4">
          <div className="w-full md:w-1/2 lg:w-5/12 mb-4 p-3 flex justify-center rounded bg-white shadow-lg">
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faEnvelopeOpenText}
                className="text-orange-600 text-4xl mr-4"
              />
              <div>
                <h3 className="text-xl text-gray-700 pb-1 mb-2">Email us</h3>
                <p className="text-gray-600 pb-1 mb-2">
                  Please feel free to drop us a line.
                </p>
                <a
                  href="mailto:hello@eduport.app"
                  className="text-base text-orange-600 flex items-center"
                >
                  hello@iteach.app
                </a>
              </div>
            </div>
          </div>

          {/* Add more cards similar to the one above here. */}

          <div className="w-full md:w-1/2 lg:w-5/12 mb-4">
            <iframe
              src="https://www.google.com/maps/embed?..."
              className="w-full h-64 rounded shadow-lg"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div className="bg-white rounded p-10 mb-4 shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl text-gray-700 pb-1 mb-4">
              Leave Us a Message
            </h2>
            <p className="text-lg text-gray-600 pb-1 mb-4">
              Thank you for visiting our website.
            </p>
          </div>

          <div className="flex flex-wrap -mx-2">
            <div className="w-full sm:w-1/2 mb-4 px-2">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm mb-2"
              >
                Full name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 rounded border"
                required
              />
            </div>
            <div className="w-full sm:w-1/2 mb-4 px-2">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm mb-2"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 rounded border"
                required
              />
            </div>
            <div className="w-full mb-4 px-2">
              <label
                htmlFor="message"
                className="block text-gray-700 text-sm mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                className="w-full h-24 p-2 rounded border"
                required
              ></textarea>
            </div>
            <div className="px-2">
              <button
                type="submit"
                className="bg-orange-500 text-white rounded px-8 py-2"
              >
                Send message
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
