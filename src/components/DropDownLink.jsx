import { useNavigate } from "react-router-dom";

export default function DropDownLink({ to, children }) {
    const navigate = useNavigate();

    const linkClick = e => {
        e.preventDefault();
        navigate(to);
    }

    return (
        <a href={`${to}`} onClick={e => linkClick(e)}>{children}</a>
    )
}