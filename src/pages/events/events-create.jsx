import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent } from '../../redux/slices/eventSlices';

function EventCreate() {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.events);


  const initialFormData = {
    name: '',
    topic: 'Information Technologies',
    date: '',
    place: '',
    number_of_seats: 0,
    ticket_price: null,
    currency: 'USD',
    thumbnail: null, 
    description: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change for thumbnail
  const handleThumbnailChange = (e) => {
    setFormData({ ...formData, thumbnail: e.target.files[0] });
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    const formattedDate = new Date(formData.date).toISOString();
    setFormData({ ...formData, date: formattedDate });
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === 'thumbnail') {
        formDataToSend.append(key, formData[key], formData[key].name);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    dispatch(createEvent(formDataToSend));

  };

  return (
    <>
      <div className="w-full max-w-xl mx-auto">
        <form
          className="bg-white rounded px-8 pt-6 pb-8 mb-4"
          encType="multipart/form-data"
          onSubmit={handleCreateEvent}
        >
          <h2 className="text-2xl font-bold mb-4">Create Event</h2>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Event Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
              placeholder="Event Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              maxLength={200}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="topic"
              className="block text-gray-700 font-bold mb-2"
            >
              Topic
            </label>
            <select
              id="topic"
              name="topic"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
              value={formData.topic}
              onChange={handleInputChange}
              required
            >
              <option value="Information Technologies">
                Information Technologies
              </option>
              <option value="Science">Science</option>
              <option value="Biology">Biology</option>
              <option value="Business">Business</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-gray-700 font-bold mb-2"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
              placeholder="Event Date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="place"
              className="block text-gray-700 font-bold mb-2"
            >
              Place
            </label>
            <input
              type="text"
              id="place"
              name="place"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
              placeholder="Event Place"
              value={formData.place}
              onChange={handleInputChange}
              required
              maxLength={250}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="number_of_seats"
              className="block text-gray-700 font-bold mb-2"
            >
              Number of Seats
            </label>
            <input
              type="number"
              id="number_of_seats"
              name="number_of_seats"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
              placeholder="Number of Seats"
              value={formData.number_of_seats}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="ticket_price"
              className="block text-gray-700 font-bold mb-2"
            >
              Ticket Price
            </label>
            <input
              type="text"
              id="ticket_price"
              name="ticket_price"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
              placeholder="Ticket Price"
              value={formData.ticket_price}
              onChange={handleInputChange}
              required
              pattern="^-?\d{0,6}(?:\.\d{0,2})?$"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="currency"
              className="block text-gray-700 font-bold mb-2"
            >
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
              value={formData.currency}
              onChange={handleInputChange}
              required
            >
              <option value="USD">USD</option>
              <option value="UZS">UZS</option>
              <option value="PLN">PLN</option>
              <option value="RUB">RUB</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="thumbnail"
              className="block text-gray-700 font-bold mb-2"
            >
              Thumbnail
            </label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              accept=".jpg, .jpeg, .png"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
              onChange={handleThumbnailChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
              placeholder="Event Description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          {error && <center className="text-red-500 mb-4">{error}</center>}
          <div className="mb-6 text-center">
            <button
              disabled={isLoading}
              className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800"
              type="submit"
            >
              Create Event
            </button>
          </div>
          {isLoading && (
            <center className="mt-4 bg-slate-100 py-2">
              Creating event...
            </center>
          )}
        </form>
      </div>
    </>
  );
}

export default EventCreate;
