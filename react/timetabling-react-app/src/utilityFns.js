import axios from 'axios';
import { useEffect } from 'react';

// export function postData(newObj) {
//     console.log("In postData", newObj);
//     axios.post("/createRooom", newObj).then((res) => {
//         console.log("Create Room returned", res)
//     });
// }

// export const useAxiosPost = (url, payload) => {
//     const [data, setData] = useState(null);
//     const [error, setError] = useState("");
//     const [loaded, setLoaded] = useState(false);

//     useEffect(() => {
//       axios
//         .post(url, payload)
//         .then((response) => setData(response.data))
//         .catch((error) => setError(error.message))
//         .finally(() => setLoaded(true));
//     }, []);

//     return { data, error, loaded };
//   };

export function useLoadData(apiRoute, setterFn, setIsLoadingFn, newObj) {
    console.log("In useLoadData", apiRoute, ", Params are:", newObj);

    useEffect(() => {
        axios.get(apiRoute, { params: { ...newObj } }).then((res) => {
            console.log("Got obj", res.data);
            setterFn(res.data.result);

            if (setIsLoadingFn) {
                setIsLoadingFn(false);
            }
        });

    }, []);

}


export function useFormSubmit(apiRoute, newObj) {

    console.log("posting data via custom hook to and with", apiRoute, newObj);
    axios.post(apiRoute, newObj).then((res) => {
        console.log("API Route returned", res);
        // useLoadData("/getRoomList", setRoomList);
    }).catch((err) => {
        console.log("Caught err", err);
    });
}

export function handleFormSubmit(submitFormData) {

    let {
        isEditMode,
        id,
        updateRoute,
        createRoute,
        getListRoute,
        newObj,
        setListFn,
        setIsLoadingFn,
        resetterFnsObj
    } = submitFormData;

    console.log("In handleFormSubmit, editMode is", isEditMode, id);
    setIsLoadingFn(true);

    let apiRoute = isEditMode ? updateRoute : createRoute;

    // let newObj = { name: roomName, type: roomType, enabled: 1 };
    if (id) {
        newObj["id"] = id;
    }

    console.log("Submitting form by posting data to apiRoute", apiRoute, newObj);

    axios.post(apiRoute, newObj).then((res) => {
        console.log(apiRoute, "returned", res);
        // Cannot use a hook inside a normal function within a functional component
        // useLoadData("/getRoomList", setRoomList);

        console.log("Calling axios to reload data");

        // Call the axios directly
        axios.get(getListRoute, { params: { ...newObj } }).then((res) => {
            console.log("Got room list", res.data);
            setListFn(res.data.result);
            setIsLoadingFn(false);
        });

        // Clear the data entry form
        resetFormFields(resetterFnsObj);


    }).catch((err) => {
        console.log("Caught err", err);
    });
}


export function resetFormFields(resetFnsObj) {
    // Reset input fields and edit mode

    console.log("Inside handleFormCancel", resetFnsObj);

    for (let resetter of resetFnsObj) {
        console.log("Calling...", resetter.resetterFn);
        resetter.resetterFn(resetter.resetValue);
    }
}

export function deleteItem(deleteDataObj) {

    console.log("Deleting item by posting data for id", deleteDataObj);

    deleteDataObj.setIsLoadingFn(true);

    axios.post(deleteDataObj.deleteRoute, deleteDataObj.newObj).then((res) => {
        console.log("Delete route returned", res);
        // Cannot use a hook inside a normal function within a functional component
        // useLoadData("/getRoomList", setRoomList);

        console.log("Calling axios to reload data");

        // Call the axios directly
        axios.get(deleteDataObj.getListRoute, { params: { ...deleteDataObj.newObj } }).then((res) => {
            console.log("Got list", res.data);
            deleteDataObj.setListFn(res.data.result);
            deleteDataObj.setIsLoadingFn(false);
        });


    }).catch((err) => {
        console.log("Caught err", err);
    });
}


export function handleRunPlan(submitFormData) {

    console.log("Handling play run for plan run id", submitFormData.newObj.id);

    submitFormData.setIsLoadingFn(true);

    axios.post("/runPlan", submitFormData.newObj).then((res) => {
        console.log("Plan Run returned", res);
        console.log("Calling axios to reload data");

        // Call the axios directly
        axios.get(submitFormData.getListRoute, { params: { ...submitFormData.newObj } }).then((res) => {
            console.log("Got list", res.data);
            submitFormData.setListFn(res.data.result);
            submitFormData.setIsLoadingFn(false);
        });


    }).catch((err) => {
        console.log("Caught err", err);
    });
}