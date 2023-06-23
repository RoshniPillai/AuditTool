import * as React from 'react';
import useAutocomplete, { AutocompleteGetTagProps } from '@mui/base/useAutocomplete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';
// import searchicon from "./search.jpg";
const Root = styled('div')(
  ({ theme }) => `
  color: ${
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
  };
 
  font-size: 12px;
`,
);

const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled('div')(
  ({ theme }) => `
  width: 120px;
  // border: 1px solid red;
    background-color: #28292B;
    border-radius: 6px;
    color: #fff;
   background-color: #3D4044;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;
  // border: 1px solid red;
background: #28292B;

  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
  }

  &.focused {
    // border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    // box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
  &.focused img {
    display:none;
  }
  & input {
    background-color: #28292B;
    border-radius: 6px;
    color: #fff;
    height: 24px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`,
);

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
  label: string;
}

function Tag(props: TagProps) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

const StyledTag = styled(Tag)<TagProps>(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 21px;
  background-color: #148291;
  color: #fff;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  // border: 1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#e8e8e8'};
  border-radius: 4px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#40a9ff'};
    color: red;
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 400;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`,
);

const Listbox = styled('ul')(
  ({ theme }) => `
  width: 120px;
  font-size: 12px;
  letter-spacing: 0;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#3D4044'};
  color: #fff;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
      font-weight: 400;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? 'red' : '#148291'};
    font-weight: 400;

    & svg {
      color: #fff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#148291'};
    cursor: pointer;
    font-weight: 400;
    & svg {
      color: currentColor;
    }
  }
`,
);

export default function UserSelect() {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    defaultValue: [],
    // defaultValue: [usernames[1]],
    multiple: true,
    options: usernames,
    getOptionLabel: (option) => option.title,
  });

  return (
    <Root>
      <div {...getRootProps()}  className="user-selectBox">
        {/* <Label {...getInputLabelProps()}>User</Label> */}
        <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
        <img src={require('./../assets/search.jpg')} width="14px" height="14px" alt="" style={{margin:4}}/>
          {value.map((option: RecordType, index: number) => (
            <StyledTag label={option.title} {...getTagProps({ index })} />
          ))}
          <input {...getInputProps()} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {(groupedOptions as typeof usernames).map((option, index) => (
            <li {...getOptionProps({ option, index })}>
              <span>{option.title}</span>
              <CheckIcon fontSize="small" />
            </li>
          ))}
        </Listbox>
      ) : null}
    </Root>
  );
}

interface RecordType {
  title: string;
}
const usernames = [
  { title: "Travis Quirk " },
  { title: "Nicholas Little" },
  { title: "Dave Smith" },
  { title: "Ryan Stimpson"}];
