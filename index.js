
const endpoints = {
    ipv4: "https://api.ipify.org?format=json",
    ipv6: "https://api6.ipify.org?format=json",
    location: "https://ipapi.co/{ip}/json/"
};
export const ipv4 = async () => {
    const response = await fetch(endpoints.ipv4);
    return await response.json();
};

export const ipv6 = async () => {
    const response = await fetch(endpoints.ipv6);
    return await response.json();
};

export const locationDetails = async ()=>{
    const ipv4data = await ipv4();
    const response = await fetch(endpoints.location.replace("{ip}", ipv4data?.ip));
    return await response.json();
}
