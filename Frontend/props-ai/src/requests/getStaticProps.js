async function getStaticProps() {
    const response = await fetch('http://localhost:5000/props?platform=prizepicks');
    const data = await response.json();

    return {
        props: {
            jsonData: data
        }
    };
}
export default getStaticProps