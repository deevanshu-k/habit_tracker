import { Strong, Text } from "@radix-ui/themes";

function Footer() {
    return (
        <footer
            className="p-3 flex flex-row justify-center"
            style={{ borderTop: "2px solid var(--gray-5)" }}
        >
            <Text>
                Made by ❤️{" "}
                <Strong style={{ textDecoration: "underline" }}>
                    Deevanshu Kushwah
                </Strong>
            </Text>
        </footer>
    );
}

export default Footer;
