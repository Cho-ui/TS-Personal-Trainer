import React from "react";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

type Props = {
    exportCsv: () => void
}

export default function ExportCsv(props: Props) {

    return(
        <div>
            <Button icon={ <DownloadOutlined /> } onClick={props.exportCsv}>Export</Button>
        </div>
    )
};