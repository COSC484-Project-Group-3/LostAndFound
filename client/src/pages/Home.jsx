import Header from "../components/header/Header";
import HomePost from "../components/posts/HomePost";
import { AuthService } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
        <Header />
            <div className="home-content">
                <HomePost />
            </div>
            <style jsx="true">{`
                .home-content {
                    margin: 0px auto;
                    margin: 60px 10px 0;
                }
                @media screen and (max-width: 400px) {
                    .home-content {
                        margin: 50px 10px 0;
                    }
                }
            `}</style>
        </div>
    );
}

export default Home;
