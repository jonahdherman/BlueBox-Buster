import React, { useEffect, useRef } from "react";

const ShipMap = ({ allAddresses, allOrders }) => {
    const el = useRef();

    useEffect(() => {
        async function initMap() {
            const orderAddresses = allAddresses.filter(address => allOrders.find(order => order.address_id === address.id))
            // Request needed libraries.
            const { Map } = await google.maps.importLibrary("maps");
            const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
            const map = new Map(el.current, {
                center: { lat: 40.0746788, lng: -98.33033379999999 },
                zoom: 5,
                mapId: "4504f8b37365c3d0",
            });
            orderAddresses.forEach(address => {
                new AdvancedMarkerElement({
                map,
                position: { 
                    lat: address.data.geometry.location.lat, 
                    lng: address.data.geometry.location.lng
                },
            });
            });
        }

        initMap();
    }, [allAddresses, allOrders]);
    return (
        <>
            <div ref={el} style={{ height: '700px', position: 'relative', zIndex: 0 }}></div>
        </>
    );
}

export default ShipMap;