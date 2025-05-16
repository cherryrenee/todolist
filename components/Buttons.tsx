"use client";

import { on } from "events";

export default function Buttons({ onClick, className}
    return (
        <button
            onClick={onClick}
            className={className}
          ></button>
    );
})