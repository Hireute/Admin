import { useState } from "react";

const EditVehicle=({ vehicle, onClose, onSave })=> {
    const [formData, setFormData] = useState({ ...vehicle });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
          <h2 className="text-lg font-semibold mb-4">Edit Vehicle</h2>
          <form onSubmit={handleSubmit}>
            <label className="block mb-2">
              Vehicle Name:
              <input
                type="text"
                name="Vehiclename"
                value={formData.Vehiclename}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md p-2"
              />
            </label>
            <label className="block mb-2">
              Length:
              <input
                type="text"
                name="Length"
                value={formData.Length}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md p-2"
              />
            </label>
            <label className="block mb-2">
              Height:
              <input
                type="text"
                name="Height"
                value={formData.Height}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md p-2"
              />
            </label>
            <label className="block mb-2">
              Width:
              <input
                type="text"
                name="Width"
                value={formData.Width}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md p-2"
              />
            </label>
            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  export default EditVehicle;
  