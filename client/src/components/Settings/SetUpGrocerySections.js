import React, { useEffect, useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { GrocerySection } from "./GrocerySection";
import { H3, List, Input } from "../../elements/index";
import styled from "styled-components";

// Styled Components
const Ul = styled.ul`
    padding-left: 3%;
`;

const Wrapper = styled.div`
    margin: auto;
`;

/*
    SUMMARY:
        Map grocery sections to components
        Create new sections
        Set default section               
    PARAMS: 
        

*/
export const SetUpGrocerySections = () => {
    // Context
    const { grocerySections, getGrocerySections, addGrocerySection } = useContext(GlobalContext);

    // State
    const [grocerySection, setGrocerySection] = useState("");
    const [placeHolderText, setPlaceHolderText] = useState("Enter Grocery Section...");
    const [errors, setErrors] = useState([]);

    // Functions
    // get current section from db
    useEffect(() => {
        getGrocerySections();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Create new section
    const handleOnClick = () => {
        let errs = [];
        if (grocerySection.length === 0) {
            setPlaceHolderText("Enter Grocery Section...");
            return;
        }
        let foundMatch = false;
        grocerySections.sections.forEach((section) => {
            if (section.toLowerCase() === grocerySection.toLowerCase()) {
                setGrocerySection("");
                setPlaceHolderText("Section Names Must Be Unique");
                errs.push("Section Names Must Be Unique");
                foundMatch = true;
                return;
            }
        });
        setErrors(errs);
        if (foundMatch) return;
        addGrocerySection(grocerySections._id, grocerySection);
        setGrocerySection("");
    };

    // allow enter to create section
    const handleKeyDown = (key) => {
        if (key === "Enter") {
            handleOnClick();
        }
    };

    return (
        <>
            <H3>Grocery Sections</H3>
            {errors.map((error) => (
                <p className="error" key={error}>
                    {error}
                </p>
            ))}
            <Ul>
                {grocerySections.sections.map((section) => (
                    <GrocerySection
                        key={section}
                        sectionLabel={section}
                        _id={grocerySections._id}
                        isDefault={section === grocerySections.default}
                        defaultSection={grocerySections.default}
                        setErrorsFunc={setErrors}
                    />
                ))}
                <List>
                    <Input
                        onKeyDown={(e) => handleKeyDown(e.key)}
                        isGrocerySection
                        value={grocerySection}
                        onChange={(e) => setGrocerySection(e.target.value)}
                        placeholder={placeHolderText}
                    />
                    <Wrapper>
                        <button className="float-right btn btn-success btn-sm" onClick={handleOnClick}>
                            +
                        </button>
                    </Wrapper>
                </List>
            </Ul>
        </>
    );
};
