import { IMAGES } from "../../shared";

export function NotFoundPage() {
    return (
        <div>
            <h1>Page not found :(</h1>
            <img src={IMAGES.notFound} alt="Not found" />
        </div>
    )
}