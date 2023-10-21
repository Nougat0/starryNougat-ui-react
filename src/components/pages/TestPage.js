const TestPage = () => {


    return (
        <>
        <button onClick={()=>{
            axios.get(process.env.REACT_APP_RESOURCE_URI + "/calendar/pmType").then((res)=>{
                console.log(`pmType Test: ${res.data}`);
            }).catch((e)=> console.log(e));
        }}>
            API 버튼
        </button>
        </>
    );
}

export default TestPage;