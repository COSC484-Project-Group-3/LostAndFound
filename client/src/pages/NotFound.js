import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="NotFound">
        <h2>404 Page not found!</h2>
        <p>The request made is not found on this website</p>
        <p>Go to the <Link to="/">Homepage</Link>.</p>
        <style jsx="true">{`
                .NotFound {
                    max-width: 500px;
                    margin: 100px auto;
                }
            `}</style>
    </div>
  );
}
