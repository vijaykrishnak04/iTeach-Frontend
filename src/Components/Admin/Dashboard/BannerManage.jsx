import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCloud,
  faPlus,
  faSpinner,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  addBannerApi,
  deleteBannerApi,
  getBannersApi,
} from "../../../Services/Admin";

const BannerManage = () => {
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [bannersFromDB, setBannersFromDB] = useState([]);
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const headers = {
    Authorization: localStorage.getItem("adminToken"),
  };

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        getBannersApi(headers).then((response) =>
          setBannersFromDB(response.data)
        );
      } catch (error) {
        console.error("Error fetching banners:", error);
        // Optionally: Show some notification to the user that fetching failed.
      }
    };

    fetchBanners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setBannerFile(e.target.files[0]);
      setBannerImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const removeBanner = (_id) => {
    deleteBannerApi(_id, headers).then(() =>
      setBannersFromDB(bannersFromDB.filter((banner) => banner._id !== _id))
    );
  };

  const nextBanner = () => {
    if (activeBannerIndex < bannersFromDB.length - 1) {
      setActiveBannerIndex(activeBannerIndex + 1);
    } else {
      // Wrap around to the first banner
      setActiveBannerIndex(0);
    }
  };

  const prevBanner = () => {
    if (activeBannerIndex > 0) {
      setActiveBannerIndex(activeBannerIndex - 1);
    } else {
      // Wrap around to the last banner
      setActiveBannerIndex(bannersFromDB.length - 1);
    }
  };

  const handleUpload = async () => {
    setIsLoading(true);
    try {
      const data = new FormData();
      data.append("image", bannerFile);
      addBannerApi(headers, data).then((response) =>
        setBannersFromDB((prevBanner) => [...prevBanner, response.data])
      );
    } catch (error) {
      console.error("Error uploading the banner:", error);
      // Optionally: Show some notification to the user that the upload failed.
    } finally {
      setIsLoading(false);
      setBannerFile(null);
      setBannerImage(null);
    }
  };

  return (
    <div className="bg-blue-100 p-4 rounded-xl shadow-lg w-full h-3/4 flex flex-col items-center space-y-8">
      <h2 className="text-2xl font-semibold mb-2 text-center text-blue-600">
        Banner Management
      </h2>

      {bannersFromDB.length > 0 && (
        <div className="mb-6 relative w-4/5">
          <img
            className="w-full object-cover rounded-md"
            src={bannersFromDB[activeBannerIndex].bannerImage?.url}
            alt="Banner from DB"
          />
          <button
            onClick={() => removeBanner(bannersFromDB[activeBannerIndex]._id)}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
          <button
            onClick={prevBanner}
            className="absolute top-1/2 left-2 bg-black text-white p-2 rounded-full hover:bg-gray-700 transition transform -translate-y-1/2"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button
            onClick={nextBanner}
            className="absolute top-1/2 right-2 bg-black text-white p-2 rounded-full hover:bg-gray-700 transition transform -translate-y-1/2"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      )}

      {bannerImage && (
        <div className="w-4/5">
          <h3 className="text-lg font-medium mb-2">Uploaded Banner Preview:</h3>
          <img
            className="w-full object-cover rounded-md"
            src={bannerImage}
            alt="Uploaded banner"
          />
        </div>
      )}

      <div className="flex justify-center w-full">
        <label className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition cursor-pointer flex items-center space-x-2">
          <FontAwesomeIcon icon={faPlus} />
          <input
            type="file"
            accept=".jpeg, .jpg, .png"
            className="hidden"
            onChange={onImageChange}
          />
          <span>Add New Banner</span>
        </label>
        {bannerImage && (
          <button
            className="bg-green-500 ml-3 text-white px-6 py-2 rounded-full hover:bg-green-600 transition cursor-pointer flex items-center space-x-2"
            onClick={handleUpload}
          >
            {isLoading ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <FontAwesomeIcon icon={faCloud} />
            )}
            <span>Upload</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default BannerManage;
