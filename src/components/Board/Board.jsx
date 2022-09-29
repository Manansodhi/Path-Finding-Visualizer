import React, { useState, useEffect } from "react";
import { Graph } from "../Graph/Graph";
import styles from "./Board.module.css";
import { mapValues } from "lodash";
import {
  Dropdown,
  ProgressIndicator,
} from "@fluentui/react";
import { edgeOptions, algoOptions } from "../../assets/js/readOnly";

export default function Board () {
  const [options, setOptions] = useState({
    drawNode: true,
    reset: false,
    editEdge: false,
  });
  const [nodeSelection, setNodeSelection] = useState({
    isStartNodeSelected: false,
    isEndNodeSelected: false,
  });
  const [selectedEdge, setSelectedEdge] = useState(
    edgeOptions[0]
  );
  const [selectedAlgo, setSelectedAlgo] = useState(
    algoOptions[0]
  );
  const [isVisualizing, setVisualizingState] = useState(false);
  const visualizationSpeed = 1000;

  useEffect(() => {
    if (!isVisualizing) {
      setSelectedAlgo({ key: "select", text: "Select Algorithm" });
    }
  }, [isVisualizing]);

  //Activates the desired option from control panel.
  const activateOption = (option) => {
    const updatedOptions = mapValues(options, (_value, key) =>
      key === option ? true : false
    );
    setSelectedEdge({ key: "select", text: "Select Edge" });
    setSelectedAlgo({ key: "select", text: "Select Algorithm" });
    setNodeSelection({
      ...nodeSelection,
      isStartNodeSelected: false,
      isEndNodeSelected: false,
    });
    setOptions(updatedOptions);
  };

  //handles the selection of edge options and corresponding toggles for other options in control panel.
  const handleEdgeOptions = (_event,option) => {
    const updatedOptions = mapValues(options, () => false);
    setOptions(updatedOptions);
    setSelectedAlgo({ key: "select", text: "Select Algorithm" });
    setSelectedEdge(option);
  };

  //handles the selection of algo options and corresponding toggles for other options in control panel.
  const handleAlgoOptions = (_event,option) => {
    setSelectedAlgo(option);
    setSelectedEdge({ key: "select", text: "Select Edge" });
    if (option?.key === "select") {
      const updatedOptions = mapValues(options, () => false);
      setOptions(updatedOptions);
    } else if (option?.data === "traversal") {
      setNodeSelection({ ...nodeSelection, isStartNodeSelected: true });
      const updatedOptions = mapValues(options, () => false);
      setOptions(updatedOptions);
    } else if (option?.data === "pathfinding") {
      setNodeSelection({
        ...nodeSelection,
        isStartNodeSelected: true,
        isEndNodeSelected: true,
      });
      const updatedOptions = mapValues(options, () => false);
      setOptions(updatedOptions);
    }
  };

  return (
    <>
      <div className={styles.board}>
        <div
          className={styles.controlPanel}
        >
          <div className={styles.nodeOptions}>
            <button
              className={`${styles.optionButtons} ${
                options.drawNode && styles.selectedButtonOption
              }`}
              onClick={() => activateOption("drawNode")}
              disabled={isVisualizing}
            >
              <i className={`${styles.icon} fas fa-circle`}></i>
              Draw Node
            </button>
          </div>
          <div className={styles.edgeOptions}>
            <Dropdown
              className={`${styles.dropdownWrapper} ${
                selectedEdge?.key !== "select" && styles.selectedDropdownOption
              }`}
              options={edgeOptions}
              placeholder="Select Edge"
              selectedKey={selectedEdge && selectedEdge.key}
              onChange={handleEdgeOptions}
              disabled={isVisualizing}
            />
            <button
              className={`${styles.optionButtons} ${
                options.editEdge && styles.selectedButtonOption
              }`}
              onClick={() => activateOption("editEdge")}
              disabled={isVisualizing}
            >
              <i className={`${styles.icon} fas fa-pen`}></i>
              Edit Edge
            </button>
          </div>
          <div className={styles.visualizeControls}>
            <Dropdown
              className={`${styles.dropdownWrapper} ${
                selectedAlgo?.key !== "select" && styles.selectedDropdownOption
              }`}
              options={algoOptions}
              placeholder="Select Algorithm"
              selectedKey={selectedAlgo && selectedAlgo.key}
              onChange={handleAlgoOptions}
              disabled={isVisualizing}
            />
          </div>
          <div className={styles.miscellaneous}>
            <button
              className={`${styles.optionButtons} ${
                options.reset && styles.selectedButtonOption
              }`}
              onClick={() => activateOption("reset")}
              disabled={isVisualizing}
            >
              <i className={`${styles.icon} fas fa-undo-alt`}></i>
              Reset
            </button>
          </div>
        </div>

        <div className={styles.visualizerProgress}>
          {isVisualizing ? (
            <ProgressIndicator styles={{ itemProgress: { padding: "0" } }} />
          ) : (
            <hr />
          )}
        </div>
        <div className={styles.graphContainer}>
          <Graph
            options={options}
            selectedAlgo={selectedAlgo}
            selectedEdge={selectedEdge}
            visualizationSpeed={visualizationSpeed}
            setVisualizingState={setVisualizingState}
            isVisualizing={isVisualizing}
            nodeSelection={nodeSelection}
            setNodeSelection={setNodeSelection}
          />
        </div>
      </div>
    </>
  );
};
