import * as React from "react";
import { BackArrow } from "../back_arrow";
import { getParam } from "../../util";
import { destroyPlant } from "../actions";
import { Plant as NewPlant } from "../plant";
import { Plant } from "../interfaces";
import { Everything } from "../../interfaces";
import { connect } from "react-redux";
import * as lodash from "lodash";
import * as moment from "moment";

interface EditPlantInfoProps extends Everything {
    params: {
        plant_id: string;
    };
}

@connect((state: Everything) => state)
export class EditPlantInfo extends React.Component<EditPlantInfoProps, {}> {
    render() {
        let plant_id = parseInt(this.props.params.plant_id);
        let plants = this.props.designer.plants;
        let currentPlant = _.findWhere(plants, { id: plant_id });

        let { name, x, y, planted_at } = currentPlant;

        let dayPlanted = moment();
        // Same day = 1 !0
        let daysOld = dayPlanted.diff(moment(planted_at), "days") + 1;
        let plantedAt = moment(planted_at).format("MMMM Do YYYY, h:mma");

        return <div className="panel-container green-panel">
            <div className="panel-header green-panel">
                <p className="panel-title">
                    <BackArrow />
                    <span className="title">Edit {name}</span>
                </p>
            </div>
            <div className="panel-content">
                <label>Plant Info</label>
                <ul>
                    <li>Started: {plantedAt}</li>
                    <li>Age: {daysOld}</li>
                    <li>Location: ({x}, {y})</li>
                </ul>
                <label>Regimens</label>
                <ul>
                    <li>Soil Acidifier</li>
                </ul>
                <label>Delete This Plant</label>
                <div>
                    <button className="red button-like left">
                        Delete
                    </button>
                </div>
            </div>
        </div>;

    }
}
