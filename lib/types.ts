type IdRequest = string | string;
type EmptyObject = Record<string, never>;
type StringRequest = string;
type SelectColor = "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red";
type SelectPropertyResponse = {
    id: StringRequest;
    name: StringRequest;
    color: SelectColor;
};
type RollupFunction = "count" | "count_values" | "empty" | "not_empty" | "unique" | "show_unique" | "percent_empty" | "percent_not_empty" | "sum" | "average" | "median" | "min" | "max" | "range" | "earliest_date" | "latest_date" | "date_range" | "checked" | "unchecked" | "percent_checked" | "percent_unchecked" | "count_per_group" | "percent_per_group" | "show_original";
type NumberFormat = "number" | "number_with_commas" | "percent" | "dollar" | "canadian_dollar" | "singapore_dollar" | "euro" | "pound" | "yen" | "ruble" | "rupee" | "won" | "yuan" | "real" | "lira" | "rupiah" | "franc" | "hong_kong_dollar" | "new_zealand_dollar" | "krona" | "norwegian_krone" | "mexican_peso" | "rand" | "new_taiwan_dollar" | "danish_krone" | "zloty" | "baht" | "forint" | "koruna" | "shekel" | "chilean_peso" | "philippine_peso" | "dirham" | "colombian_peso" | "riyal" | "ringgit" | "leu" | "argentine_peso" | "uruguayan_peso";
type NumberDatabasePropertyConfigResponse = {
    type: "number";
    number: {
        format: NumberFormat;
    };
    id: string;
    name: string;
};
type FormulaDatabasePropertyConfigResponse = {
    type: "formula";
    formula: {
        expression: string;
    };
    id: string;
    name: string;
};
type SelectDatabasePropertyConfigResponse = {
    type: "select";
    select: {
        options: Array<SelectPropertyResponse>;
    };
    id: string;
    name: string;
};
type MultiSelectDatabasePropertyConfigResponse = {
    type: "multi_select";
    multi_select: {
        options: Array<SelectPropertyResponse>;
    };
    id: string;
    name: string;
};
type StatusPropertyResponse = {
    id: StringRequest;
    name: StringRequest;
    color: SelectColor;
};
type StatusDatabasePropertyConfigResponse = {
    type: "status";
    status: {
        options: Array<StatusPropertyResponse>;
        groups: Array<{
            id: StringRequest;
            name: StringRequest;
            color: SelectColor;
            option_ids: Array<string>;
        }>;
    };
    id: string;
    name: string;
};
type SinglePropertyDatabasePropertyRelationConfigResponse = {
    type: "single_property";
    single_property: EmptyObject;
    database_id: IdRequest;
};
type DualPropertyDatabasePropertyRelationConfigResponse = {
    type: "dual_property";
    dual_property: {
        synced_property_id: StringRequest;
        synced_property_name: StringRequest;
    };
    database_id: IdRequest;
};
type DatabasePropertyRelationConfigResponse = SinglePropertyDatabasePropertyRelationConfigResponse | DualPropertyDatabasePropertyRelationConfigResponse;
type RelationDatabasePropertyConfigResponse = {
    type: "relation";
    relation: DatabasePropertyRelationConfigResponse;
    id: string;
    name: string;
};
type RollupDatabasePropertyConfigResponse = {
    type: "rollup";
    rollup: {
        rollup_property_name: string;
        relation_property_name: string;
        rollup_property_id: string;
        relation_property_id: string;
        function: RollupFunction;
    };
    id: string;
    name: string;
};
type TitleDatabasePropertyConfigResponse = {
    type: "title";
    title: EmptyObject;
    id: string;
    name: string;
};
type RichTextDatabasePropertyConfigResponse = {
    type: "rich_text";
    rich_text: EmptyObject;
    id: string;
    name: string;
};
type UrlDatabasePropertyConfigResponse = {
    type: "url";
    url: EmptyObject;
    id: string;
    name: string;
};
type PeopleDatabasePropertyConfigResponse = {
    type: "people";
    people: EmptyObject;
    id: string;
    name: string;
};
type FilesDatabasePropertyConfigResponse = {
    type: "files";
    files: EmptyObject;
    id: string;
    name: string;
};
type EmailDatabasePropertyConfigResponse = {
    type: "email";
    email: EmptyObject;
    id: string;
    name: string;
};
type PhoneNumberDatabasePropertyConfigResponse = {
    type: "phone_number";
    phone_number: EmptyObject;
    id: string;
    name: string;
};
type DateDatabasePropertyConfigResponse = {
    type: "date";
    date: EmptyObject;
    id: string;
    name: string;
};
type CheckboxDatabasePropertyConfigResponse = {
    type: "checkbox";
    checkbox: EmptyObject;
    id: string;
    name: string;
};
type CreatedByDatabasePropertyConfigResponse = {
    type: "created_by";
    created_by: EmptyObject;
    id: string;
    name: string;
};
type CreatedTimeDatabasePropertyConfigResponse = {
    type: "created_time";
    created_time: EmptyObject;
    id: string;
    name: string;
};
type LastEditedByDatabasePropertyConfigResponse = {
    type: "last_edited_by";
    last_edited_by: EmptyObject;
    id: string;
    name: string;
};
type LastEditedTimeDatabasePropertyConfigResponse = {
    type: "last_edited_time";
    last_edited_time: EmptyObject;
    id: string;
    name: string;
};
export type DatabasePropertyConfigResponse = NumberDatabasePropertyConfigResponse | FormulaDatabasePropertyConfigResponse | SelectDatabasePropertyConfigResponse | MultiSelectDatabasePropertyConfigResponse | StatusDatabasePropertyConfigResponse | RelationDatabasePropertyConfigResponse | RollupDatabasePropertyConfigResponse | TitleDatabasePropertyConfigResponse | RichTextDatabasePropertyConfigResponse | UrlDatabasePropertyConfigResponse | PeopleDatabasePropertyConfigResponse | FilesDatabasePropertyConfigResponse | EmailDatabasePropertyConfigResponse | PhoneNumberDatabasePropertyConfigResponse | DateDatabasePropertyConfigResponse | CheckboxDatabasePropertyConfigResponse | CreatedByDatabasePropertyConfigResponse | CreatedTimeDatabasePropertyConfigResponse | LastEditedByDatabasePropertyConfigResponse | LastEditedTimeDatabasePropertyConfigResponse;

export type DatabaseColumnsType = {
    [key: string]: DatabasePropertyConfigResponse;
}