const dateFromStamp = (timestamp) => {
    if (timestamp === null) return "";
    let d = new Date(timestamp * 1000);
    return d.toDateString();
};

export default dateFromStamp;
