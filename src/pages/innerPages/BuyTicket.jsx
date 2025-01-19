import React from 'react';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import BuyTicketContent from '../../components/ticket/BuyTicketContent';

const BuyTicket = () => {
    return (
        <>
            <div className="page-wrapper">
                <span className="header-span"></span>
                <BreadCrumb title="Buy Ticket" breadCrumb="buy-ticket" />
                <BuyTicketContent />
            </div>
        </>
    );
};

export default BuyTicket;