import Head from "next/head";

export default function DeleteMyData() {
    return (
        <>
            <Head>
                <title>Delete My Data - SocialX</title>
            </Head>
            <main className="flex flex-col items-center justify-center min-h-screen p-4">
                <h1 className="text-2xl font-bold">User Data Deletion</h1>
                <p className="mt-4 text-center">
                    If you want to delete your data from SocialX, please send an email to
                    <strong> support@socialxnext.com</strong> with your account details.
                </p>
            </main>
        </>
    );
}
