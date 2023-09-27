import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { getBannersApi } from "../../Services/LandingService";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  console.log(banners);
  useEffect(() => {
    getBannersApi().then((response) => setBanners(response.data));
  }, []);

  return (
    <div className="h-screen">
      <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
        {banners.map((banner, index) => (
          <div key={index} className="h-screen w-screen">
            <img
              src={banner.bannerImage?.url}
              alt={banner.description}
              className="object-cover h-screen w-screen"
            />
            {/* You can also display additional details about the banner here, such as a caption */}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
