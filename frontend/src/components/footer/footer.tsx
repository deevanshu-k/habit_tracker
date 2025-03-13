import { Link, Strong } from "@radix-ui/themes";

function Footer() {
    return (
        <footer
            className="p-3 flex flex-row justify-center"
            style={{ borderTop: "2px solid var(--gray-5)" }}
        >
            <Link href="https://deevanshu.bio.link/">
                Made by ❤️{" "}
                <Strong style={{ textDecoration: "underline" }}>
                    Deevanshu Kushwah
                </Strong>
            </Link>
        </footer>
    );
}

export default Footer;
