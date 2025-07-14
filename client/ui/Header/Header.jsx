import { useState } from "react";
import { Cart } from "../Cart/Cart";
import { Logo } from "../Logo/Logo";
import { Search } from "../Search/Search";
import "./Header.scss";

export function Header({ lastUpdate, onSearch }) {
    const goToCart = () => {
        location.href = '/cart';
    }

    const goToHome = () => {
        location.href = '/';
    }

    return (
        <div className="header">
            <Logo title={'Market'} onClick={goToHome} />
            <div className="right">
                <Search onSearch={onSearch} />
                <Cart onClick={goToCart} lastUpdate={lastUpdate} />
            </div>
        </div>
    )
}