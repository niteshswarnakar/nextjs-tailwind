import Link from "next/link";
import React from "react";

function DropdownLink(props) {
  let { href, children, style } = props;
  return (
    <Link href={href} legacyBehavior>
      <a className={style}>{children}</a>
    </Link>
  );
}

export default DropdownLink;
