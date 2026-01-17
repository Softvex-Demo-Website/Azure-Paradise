import HeroSection from '../components/home/HeroSection';
import RoomPreview from '../components/home/RoomPreview';
import Amenities from '../components/home/Amenities';
import SpecialOffers from '../components/home/SpecialOffers';
import Testimonials from '../components/home/Testimonials';
import InstagramFeed from '../components/home/InstagramFeed';
import Newsletter from '../components/home/Newsletter';

const Home = () => {
    return (
        <div>
            <HeroSection />
            <RoomPreview />
            <Amenities />
            <SpecialOffers />
            <Testimonials />
            <InstagramFeed />
            <Newsletter />
        </div>
    );
};

export default Home;
