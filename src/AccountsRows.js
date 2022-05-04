import "./App.css";
import React, { useState, useEffect } from "react";
import AccountsCard from './card';
import styled from "@emotion/styled";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const QuoteItem = styled.div``;


const AccountsRows = (props) => {

  const [state, setState] = useState(props.accounts);

  useEffect(() => {
    if (props.accounts !== state) {
      setState(props.accounts);
    }
  }, [props.accounts, state]);
  
  function Quote({ quote, index }) {
    return (
      <Draggable draggableId={quote.email} index={index}>
        {provided => (
          <QuoteItem
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <AccountsCard account={quote} topBorder={index === 0} removeAccount={props.removeAccount}></AccountsCard>
          </QuoteItem>
        )}
      </Draggable>
    );
  }
  
  const CardList = React.memo(function CardList({ cards }) {
    return cards.map((value, index) => (
      <Quote quote={value} index={index} key={value.email}>
      </Quote>
    ));
  });

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const cards = reorder(
      state,
      result.source.index,
      result.destination.index
    );

    setState(cards);
    props.changeOrder(cards);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <CardList cards={state} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default AccountsRows;
