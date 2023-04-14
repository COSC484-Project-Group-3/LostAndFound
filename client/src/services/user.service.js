
export class UserService {

    static getProfilePicture(svgString) {
        const svg = svgString.replace(/\\\"/g, "'")
        return `data:image/svg+xml,${svg}`;
    }
}
