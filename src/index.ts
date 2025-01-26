import getApplication from './app';

async function main() {
    const app = await getApplication();
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.info(`Server listening on port ${port}`);
    });
}

process.on('uncaughtException', (err) => {
    console.error(err, 'Uncaught Exception occurred');
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error(reason, 'Unhandled Rejection at:', promise);
    process.exit(1);
});

main();