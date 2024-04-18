import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from 'shadcn/components/ui/command';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'shadcn/components/ui/popover';


/**
 * SearchBar Component is used to query results
 * @param {query} props 
 */
export default function SearchBar(props) {

  const symbolsRef = useRef([]);
  const [open, setOpen] = useState(false);
  const {ticker} = useParams();

  if(props.suggestions) {
    //setSymbols(props.suggestions);
    symbolsRef.current = props.suggestions;
    //console.log(symbolsRef.current);
  }

  const findSymbolMatches = (wordToMatch) => {
    const symbolsArray = symbolsRef.current;

    return symbolsArray.filter(function(crypto) {
      return crypto.name.toLowerCase().includes(wordToMatch.toLowerCase()) || 
      crypto.symbol.toLowerCase().includes(wordToMatch.toLowerCase());
    });  
  };

  /**
   * This should run when the form is submitted ex: enter is pressed on the search bar
   * @param {event} e 
   */
  function handleSubmit(e) {
    e.preventDefault();
    console.log('Submitted!');
  }
  
  function handleOnChange(e) {
    //console.log('changing: ' + e.target.value);
    let current = e.target.value;
    console.log(findSymbolMatches(current));
  }

  function handleOnClickItem(value) {
    console.log('clicked!');
  }
  
  const coinImageStyle = {
    display: "block",
    maxWidth: "30px",
    maxHeight: "30px",
    paddingInline: "0px 10px"
  }

  return(
    <form onSubmit={handleSubmit} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>
        <Command>
            <CommandInput type="symbol" placeholder="BTC" />
            {open &&
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Symbols">
                {
                  symbolsRef.current.slice(0,5).map(function(element, i) {
                    return <CommandItem obj={element} key={i} value={element.symbol} onSelect={handleOnClickItem}><img src={element.icon} style={coinImageStyle} alt={element.name}/><span>{element.symbol}</span></CommandItem>
                  })
                }
              </CommandGroup>
            </CommandList>
            }
          </Command>





    </form>
  )
}