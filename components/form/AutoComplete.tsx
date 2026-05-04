"use client"
import { NEXT_PUBLIC_GOOGLE_MAP_API_KEY } from '@/config/constants';
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/react';
import { importLibrary, setOptions } from "@googlemaps/js-api-loader";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { debounce } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';


export const GoogleAutocompleteNew = ({ label, error, compulsory, onPlaceSelect, value }: any) => {

    useEffect(() => {
        setOptions({
            key: NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
        });
    }, []);

    const [options, setOptionsList] = useState<readonly any[]>([]);
    const [sessionToken, setSessionToken] = useState<google.maps.places.AutocompleteSessionToken | null>(null);
    const [inputValue, setInputValue] = useState('');

    const placesLib = useRef<google.maps.PlacesLibrary | null>(null);

    useEffect(() => {
        const setup = async () => {
            const lib = await importLibrary("places") as google.maps.PlacesLibrary;
            placesLib.current = lib;
            setSessionToken(new placesLib.current.AutocompleteSessionToken());
        };
        setup();
    }, []);

    const fetchSuggestions = useMemo(
        () =>
            debounce(async (input: string) => {
                if (!input || !placesLib.current || !sessionToken) {
                    setOptionsList([]);
                    return;
                }

                const { AutocompleteSuggestion } = placesLib.current;

                try {
                    const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions({
                        input,
                        sessionToken,
                    });
                    setOptionsList(suggestions);
                } catch (err) {
                    console.error("Autocomplete error:", err);
                }
            }, 400),
        [sessionToken]
    );

    useEffect(() => {
        setInputValue(value || '');
    }, [value]);

    useEffect(() => {
        return () => fetchSuggestions.cancel();
    }, [fetchSuggestions]);

    useEffect(() => { 
        fetchSuggestions(inputValue);
    }, [inputValue, fetchSuggestions]);

    return (
        <FormControl isInvalid={!!error} className="w-full mb-4">
            {label && (
                <FormLabel className="font-baloo text-lg">
                    {label} {compulsory && <span className="text-red-500">*</span>}
                </FormLabel>
            )}

            <Autocomplete
                options={options}
                value={value || null}
                inputValue={inputValue}
                onInputChange={(e, val) => setInputValue(val)}
                getOptionLabel={(option) => {
                    if (typeof option === 'string') return option;
                    return option?.placePrediction?.text?.text || "";
                }}
                filterOptions={(x) => x}
                autoComplete
                includeInputInList
                onChange={async (event, newValue) => {
                    if (newValue && newValue.placePrediction) {
                        const place = newValue.placePrediction.toPlace();
                        await place.fetchFields({ fields: ['formattedAddress'] });
                        onPlaceSelect(place.formattedAddress);
                    } else {
                        onPlaceSelect("");
                    }
                }}
                  // This styles the dropdown menu
                slotProps={{
                    paper: {
                        className: "!font-baloo !text-lg",
                    },
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        placeholder="Search address..."
                        slotProps={{
                            input: {
                                ...params.InputProps,
                                disableUnderline: true,
                               className: `!mt-2 !w-full !px-3 !py-[9px] !bg-[#F6F7F8] !border ${error ? '!border-red-500' : '!border-gray-300'} !rounded-md !shadow-sm !font-baloo !text-lg focus-within:!border-orange-500
                                [&_.MuiAutocomplete-endAdornment]:!px-3`,
                            },
                            htmlInput: {
                                ...params.inputProps,
                                className: "!font-baloo !text-lg !placeholder-gray-400 !pr-8 !py-0",
                            },
                        }}
                        className="[&_svg]:!fill-gray-500"
                    />
                )}
            />

            {error && <FormHelperText className="text-red-500 text-left text-xs mt-1">{error.message}</FormHelperText>}
        </FormControl>
    );
};