import {
    Link,
    makeStyles,
    Typography
} from "@material-ui/core";
import Head from "next/head";
import NextLink from "next/link";
import PageLayout from "../components/PageLayout";

const useStyles = makeStyles((theme) => ({
    githubText: {
        marginTop: "3rem"
    }
}));

export default function Error404() {
    const styles = useStyles();

    return (
        <>
            <Head>
                <title>404 - Page Not Found</title>
            </Head>
            <PageLayout>
                <Typography
                    variant="h2"
                    color="textPrimary"
                >
                    404 - Page Not Found
                </Typography>
                <NextLink href="/">
                    <Typography variant="h3">
                        <Link href="/">
                            Go to home page
                        </Link>
                    </Typography>
                </NextLink>
                <Typography
                    variant="h6"
                    color="textPrimary"
                    className={styles.githubText}
                >
                    If you think this shouldn&apos;t be
                    happening,&nbsp;
                    <Link href="https://github.com/kobra-dev/Kobra">
                        file an issue on GitHub.
                    </Link>
                </Typography>
            </PageLayout>
        </>
    );
}
