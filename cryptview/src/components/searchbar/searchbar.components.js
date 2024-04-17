import { Input } from "shadcn/components/ui/input";

/**
 * SearchBar Component is used to query results
 * @param {query} props 
 */
export default function SearchBar(props) {

  let suggestions;
  //Do we have a search file preloaded associated with the searchbar component
  if(props.suggestions) {
    suggestions = props.suggestions;
  }

  if(suggestions) {
    $.getJSON(suggestions).success(function (data) {
      var cryptoArray = data;
      
      //auto complete code here
      console.log('success!');
    })
    .error(function() {
      console.error('Cannot load search file');
    })
  }

}