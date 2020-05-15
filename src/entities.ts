
import { createMetadata } from './util';
import { ILookupValue } from './interfaces/ILookupValue';
import { IOptionSetValue } from './interfaces/IOptionSetValue';



export interface IApiAccount {
    [key: string]: string | number;
    address2_postalcode?: string;
    address1_longitude?: number;
    aging90?: number;
    address2_county?: string;
    masteraccountidname?: string;
    creditlimit_base?: number;
    address1_county?: string;
    preferredcontactmethodcode?: string;
    _modifiedby_value?: string;
    entityimageid?: string;
    statuscode?: string;
    address2_longitude?: number;
    entityimage_timestamp?: number;
    address2_line3?: string;
    aging60_base?: number;
    transactioncurrencyidname?: string;
    _createdby_value?: string;
    address1_upszone?: string;
    processid?: string;
    marketcap?: number;
    address1_stateorprovince?: string;
    emailaddress3?: string;
    emailaddress2?: string;
    emailaddress1?: string;
    _owningbusinessunit_value?: string;
    accountratingcode?: string;
    revenue?: number;
    address1_shippingmethodcode?: string;
    exchangerate?: number;
    aging30_base?: number;
    slainvokedidname?: string;
    businesstypecode?: string;
    address1_line2?: string;
    address2_composite?: string;
    _ownerid_value?: string;
    numberofemployees?: number;
    industrycode?: string;
    shippingmethodcode?: string;
    address1_utcoffset?: number;
    address2_stateorprovince?: string;
    telephone1?: string;
    preferredappointmenttimecode?: string;
    donotpostalmail?: string;
    address2_shippingmethodcode?: string;
    modifiedon?: string;
    _transactioncurrencyid_value?: string;
    _modifiedbyexternalparty_value?: string;
    createdon?: string;
    marketcap_base?: number;
    revenue_base?: number;
    address2_addressid?: string;
    aging60?: number;
    owneridtype?: string;
    paymenttermscode?: string;
    modifiedbyname?: string;
    modifiedbyexternalpartyname?: string;
    accountclassificationcode?: string;
    entityimage_url?: string;
    address2_country?: string;
    websiteurl?: string;
    _owninguser_value?: string;
    address2_line2?: string;
    address2_fax?: string;
    address1_city?: string;
    ownershipcode?: string;
    _slainvokedid_value?: string;
    fax?: string;
    donotbulkpostalmail?: string;
    territorycode?: string;
    address1_name?: string;
    parentaccountidname?: string;
    _primarycontactid_value?: string;
    aging90_base?: number;
    aging30?: number;
    _owningteam_value?: string;
    owneridname?: string;
    donotbulkemail?: string;
    address2_name?: string;
    address1_latitude?: number;
    creditlimit?: number;
    marketingonly?: string;
    address1_composite?: string;
    primarysatoriid?: string;
    address1_country?: string;
    telephone2?: string;
    createdbyexternalpartyname?: string;
    lastusedincampaign?: string;
    accountnumber?: string;
    address1_line3?: string;
    _masterid_value?: string;
    primarycontactidname?: string;
    timespentbymeonemailandmeetings?: string;
    address1_primarycontactname?: string;
    donotphone?: string;
    preferredsystemuseridname?: string;
    address2_freighttermscode?: string;
    address2_postofficebox?: string;
    donotsendmm?: string;
    _parentaccountid_value?: string;
    _preferredsystemuserid_value?: string;
    _slaid_value?: string;
    slaname?: string;
    address2_upszone?: string;
    ftpsiteurl?: string;
    isprivate?: string;
    sic?: string;
    address2_line1?: string;
    lastonholdtime?: string;
    address1_telephone1?: string;
    address1_telephone2?: string;
    description?: string;
    stageid?: string;
    address2_addresstypecode?: string;
    accountid?: string;
    stockexchange?: string;
    address1_addressid?: string;
    address2_utcoffset?: number;
    statecode?: number;
    address2_city?: string;
    address1_freighttermscode?: string;
    address2_latitude?: number;
    merged?: string;
    traversedpath?: string;
    onholdtime?: number;
    address1_line1?: string;
    address1_postofficebox?: string;
    primarytwitterid?: string;
    donotfax?: string;
    customersizecode?: string;
    address2_telephone1?: string;
    address2_telephone2?: string;
    address2_telephone3?: string;
    preferredappointmentdaycode?: string;
    _createdbyexternalparty_value?: string;
    customertypecode?: string;
    donotemail?: string;
    createdbyname?: string;
    accountcategorycode?: string;
    tickersymbol?: string;
    address2_primarycontactname?: string;
    creditonhold?: string;
    address1_addresstypecode?: string;
    address1_fax?: string;
    followemail?: string;
    name?: string;
    participatesinworkflow?: string;
    telephone3?: string;
    address1_telephone3?: string;
    sharesoutstanding?: number;
    address1_postalcode?: string;

}


export interface IFormAccount {

    address2_postalcode?: string;
    address1_longitude?: number;
    aging90?: number;
    address2_county?: string;
    address1_addresstypecodename?: number;
    creditlimit_base?: number;
    address1_county?: string;
    preferredcontactmethodcode?: string;
    modifiedby?: ILookupValue[];
    entityimageid?: string;
    statuscode?: IOptionSetValue;
    address2_longitude?: number;
    entityimage_timestamp?: number;
    address2_line3?: string;
    aging60_base?: number;
    customersizecodename?: number;
    isprivatename?: number;
    shippingmethodcodename?: number;
    createdby?: ILookupValue[];
    address1_upszone?: string;
    processid?: string;
    marketcap?: number;
    statecodename?: number;
    address1_stateorprovince?: string;
    emailaddress3?: string;
    emailaddress2?: string;
    emailaddress1?: string;
    owningbusinessunit?: ILookupValue[];
    address1_freighttermscodename?: number;
    accountratingcode?: string;
    revenue?: number;
    address1_shippingmethodcode?: string;
    exchangerate?: number;
    donotfaxname?: number;
    aging30_base?: number;
    businesstypecode?: string;
    address1_line2?: string;
    address2_composite?: string;
    ownerid?: ILookupValue[];
    numberofemployees?: number;
    industrycode?: string;
    shippingmethodcode?: string;
    address1_utcoffset?: number;
    address2_stateorprovince?: string;
    telephone1?: string;
    preferredappointmenttimecode?: string;
    donotpostalmail?: string;
    address2_shippingmethodcode?: string;
    modifiedon?: Date;
    transactioncurrencyid?: ILookupValue[];
    modifiedbyexternalparty?: ILookupValue[];
    createdon?: Date;
    address1_shippingmethodcodename?: number;
    customertypecodename?: number;
    donotemailname?: number;
    marketcap_base?: number;
    businesstypecodename?: number;
    revenue_base?: number;
    address2_addressid?: string;
    aging60?: number;
    preferredappointmenttimecodename?: number;
    owneridtype?: string;
    territorycodename?: number;
    paymenttermscode?: string;
    preferredcontactmethodcodename?: number;
    accountclassificationcode?: string;
    address2_shippingmethodcodename?: number;
    entityimage_url?: string;
    address2_country?: string;
    websiteurl?: string;
    owninguser?: ILookupValue[];
    address2_line2?: string;
    address2_fax?: string;
    paymenttermscodename?: number;
    address1_city?: string;
    ownershipcode?: string;
    slainvokedid?: ILookupValue[];
    fax?: string;
    donotpostalmailname?: number;
    donotphonename?: number;
    donotbulkpostalmail?: string;
    address2_freighttermscodename?: number;
    donotsendmarketingmaterialname?: number;
    territorycode?: string;
    accountcategorycodename?: number;
    address2_addresstypecodename?: number;
    primarycontactid?: ILookupValue[];
    aging90_base?: number;
    aging30?: number;
    owningteam?: ILookupValue[];
    preferredappointmentdaycodename?: number;
    ownershipcodename?: number;
    donotbulkemail?: string;
    address1_latitude?: number;
    creditlimit?: number;
    marketingonly?: string;
    entityimage?: number;
    address1_composite?: string;
    marketingonlyname?: number;
    primarysatoriid?: string;
    address1_country?: string;
    telephone2?: string;
    lastusedincampaign?: Date;
    accountnumber?: string;
    address1_line3?: string;
    masterid?: ILookupValue[];
    timespentbymeonemailandmeetings?: string;
    donotphone?: string;
    address2_freighttermscode?: string;
    address2_postofficebox?: string;
    donotsendmm?: string;
    accountclassificationcodename?: number;
    accountratingcodename?: number;
    parentaccountid?: ILookupValue[];
    preferredsystemuserid?: ILookupValue[];
    slaid?: ILookupValue[];
    address2_upszone?: string;
    ftpsiteurl?: string;
    isprivate?: string;
    sic?: string;
    industrycodename?: number;
    address2_line1?: string;
    lastonholdtime?: Date;
    address1_telephone1?: string;
    address1_telephone2?: string;
    description?: string;
    stageid?: string;
    address2_addresstypecode?: string;
    statuscodename?: number;
    accountid?: string;
    stockexchange?: string;
    donotbulkpostalmailname?: number;
    address1_addressid?: string;
    address2_utcoffset?: number;
    statecode?: number;
    creditonholdname?: number;
    address2_city?: string;
    participatesinworkflowname?: number;
    address1_freighttermscode?: string;
    address2_latitude?: number;
    merged?: string;
    traversedpath?: string;
    onholdtime?: number;
    address1_line1?: string;
    address1_postofficebox?: string;
    followemailname?: number;
    primarytwitterid?: string;
    donotfax?: string;
    customersizecode?: string;
    address2_telephone1?: string;
    address2_telephone2?: string;
    address2_telephone3?: string;
    preferredappointmentdaycode?: string;
    createdbyexternalparty?: ILookupValue[];
    customertypecode?: string;
    donotemail?: string;
    accountcategorycode?: string;
    tickersymbol?: string;
    creditonhold?: string;
    address1_addresstypecode?: string;
    address1_fax?: string;
    followemail?: string;
    mergedname?: number;
    name?: string;
    participatesinworkflow?: string;
    telephone3?: string;
    address1_telephone3?: string;
    sharesoutstanding?: number;
    address1_postalcode?: string;
    donotbulkemailname?: number;

}

//** Collection of Attribute structures for Account */
export const ACCOUNT_METADATA =
    createMetadata<IFormAccount>('Account', [

        {
            name: 'address2_postalcode',
            apiName: 'address2_postalcode',
            type: 'string'
        },
        {
            name: 'address1_longitude',
            apiName: 'address1_longitude',
            type: 'number'
        },
        {
            name: 'aging90',
            apiName: 'aging90',
            type: 'number'
        },
        {
            name: 'address2_county',
            apiName: 'address2_county',
            type: 'string'
        },
        {
            name: 'masteraccountidname',
            apiName: 'masteraccountidname',
            type: 'string'
        },
        {
            name: 'creditlimit_base',
            apiName: 'creditlimit_base',
            type: 'number'
        },
        {
            name: 'address1_county',
            apiName: 'address1_county',
            type: 'string'
        },
        {
            name: 'preferredcontactmethodcode',
            apiName: 'preferredcontactmethodcode',
            type: 'string'
        },
        {
            name: 'modifiedby',
            apiName: '_modifiedby_value',
            type: 'ILookupValue[]'
        },
        {
            name: 'entityimageid',
            apiName: 'entityimageid',
            type: 'string'
        },
        {
            name: 'statuscode',
            apiName: 'statuscode',
            type: 'IOptionSetValue'
        },
        {
            name: 'address2_longitude',
            apiName: 'address2_longitude',
            type: 'number'
        },
        {
            name: 'entityimage_timestamp',
            apiName: 'entityimage_timestamp',
            type: 'number'
        },
        {
            name: 'address2_line3',
            apiName: 'address2_line3',
            type: 'string'
        },
        {
            name: 'aging60_base',
            apiName: 'aging60_base',
            type: 'number'
        },
        {
            name: 'transactioncurrencyidname',
            apiName: 'transactioncurrencyidname',
            type: 'string'
        },
        {
            name: 'createdby',
            apiName: '_createdby_value',
            type: 'ILookupValue[]'
        },
        {
            name: 'address1_upszone',
            apiName: 'address1_upszone',
            type: 'string'
        },
        {
            name: 'processid',
            apiName: 'processid',
            type: 'string'
        },
        {
            name: 'marketcap',
            apiName: 'marketcap',
            type: 'number'
        },
        {
            name: 'address1_stateorprovince',
            apiName: 'address1_stateorprovince',
            type: 'string'
        },
        {
            name: 'emailaddress3',
            apiName: 'emailaddress3',
            type: 'string'
        },
        {
            name: 'emailaddress2',
            apiName: 'emailaddress2',
            type: 'string'
        },
        {
            name: 'emailaddress1',
            apiName: 'emailaddress1',
            type: 'string'
        },
        {
            name: 'owningbusinessunit',
            apiName: '_owningbusinessunit_value',
            type: 'ILookupValue[]'
        },
        {
            name: 'accountratingcode',
            apiName: 'accountratingcode',
            type: 'string'
        },
        {
            name: 'revenue',
            apiName: 'revenue',
            type: 'number'
        },
        {
            name: 'address1_shippingmethodcode',
            apiName: 'address1_shippingmethodcode',
            type: 'string'
        },
        {
            name: 'exchangerate',
            apiName: 'exchangerate',
            type: 'number'
        },
        {
            name: 'aging30_base',
            apiName: 'aging30_base',
            type: 'number'
        },
        {
            name: 'slainvokedidname',
            apiName: 'slainvokedidname',
            type: 'string'
        },
        {
            name: 'businesstypecode',
            apiName: 'businesstypecode',
            type: 'string'
        },
        {
            name: 'address1_line2',
            apiName: 'address1_line2',
            type: 'string'
        },
        {
            name: 'address2_composite',
            apiName: 'address2_composite',
            type: 'string'
        },
        {
            name: 'ownerid',
            apiName: '_ownerid_value',
            type: 'ILookupValue[]'
        },
        {
            name: 'numberofemployees',
            apiName: 'numberofemployees',
            type: 'number'
        },
        {
            name: 'industrycode',
            apiName: 'industrycode',
            type: 'string'
        },
        {
            name: 'shippingmethodcode',
            apiName: 'shippingmethodcode',
            type: 'string'
        },
        {
            name: 'address1_utcoffset',
            apiName: 'address1_utcoffset',
            type: 'number'
        },
        {
            name: 'address2_stateorprovince',
            apiName: 'address2_stateorprovince',
            type: 'string'
        },
        {
            name: 'telephone1',
            apiName: 'telephone1',
            type: 'string'
        },
        {
            name: 'preferredappointmenttimecode',
            apiName: 'preferredappointmenttimecode',
            type: 'string'
        },
        {
            name: 'donotpostalmail',
            apiName: 'donotpostalmail',
            type: 'string'
        },
        {
            name: 'address2_shippingmethodcode',
            apiName: 'address2_shippingmethodcode',
            type: 'string'
        },
        {
            name: 'modifiedon',
            apiName: 'modifiedon',
            type: 'Date'
        },
        {
            name: 'transactioncurrencyid',
            apiName: '_transactioncurrencyid_value',
            type: 'ILookupValue[]'
        },
        {
            name: 'modifiedbyexternalparty',
            apiName: '_modifiedbyexternalparty_value',
            type: 'ILookupValue[]'
        },
        {
            name: 'createdon',
            apiName: 'createdon',
            type: 'Date'
        },
        {
            name: 'marketcap_base',
            apiName: 'marketcap_base',
            type: 'number'
        },
        {
            name: 'revenue_base',
            apiName: 'revenue_base',
            type: 'number'
        },
        {
            name: 'address2_addressid',
            apiName: 'address2_addressid',
            type: 'string'
        },
        {
            name: 'aging60',
            apiName: 'aging60',
            type: 'number'
        },
        {
            name: 'owneridtype',
            apiName: 'owneridtype',
            type: 'string'
        },
        {
            name: 'paymenttermscode',
            apiName: 'paymenttermscode',
            type: 'string'
        },
        {
            name: 'modifiedbyname',
            apiName: 'modifiedbyname',
            type: 'string'
        },
        {
            name: 'modifiedbyexternalpartyname',
            apiName: 'modifiedbyexternalpartyname',
            type: 'string'
        },
        {
            name: 'accountclassificationcode',
            apiName: 'accountclassificationcode',
            type: 'string'
        },
        {
            name: 'entityimage_url',
            apiName: 'entityimage_url',
            type: 'string'
        },
        {
            name: 'address2_country',
            apiName: 'address2_country',
            type: 'string'
        },
        {
            name: 'websiteurl',
            apiName: 'websiteurl',
            type: 'string'
        },
        {
            name: 'owninguser',
            apiName: '_owninguser_value',
            type: 'ILookupValue[]'
        },
        {
            name: 'address2_line2',
            apiName: 'address2_line2',
            type: 'string'
        },
        {
            name: 'address2_fax',
            apiName: 'address2_fax',
            type: 'string'
        },
        {
            name: 'address1_city',
            apiName: 'address1_city',
            type: 'string'
        },
        {
            name: 'ownershipcode',
            apiName: 'ownershipcode',
            type: 'string'
        },
        {
            name: 'slainvokedid',
            apiName: '_slainvokedid_value',
            type: 'ILookupValue[]'
        },
        {
            name: 'fax',
            apiName: 'fax',
            type: 'string'
        },
        {
            name: 'donotbulkpostalmail',
            apiName: 'donotbulkpostalmail',
            type: 'string'
        },
        {
            name: 'territorycode',
            apiName: 'territorycode',
            type: 'string'
        },
        {
            name: 'address1_name',
            apiName: 'address1_name',
            type: 'string'
        },
        {
            name: 'parentaccountidname',
            apiName: 'parentaccountidname',
            type: 'string'
        },
        {
            name: 'primarycontactid',
            apiName: '_primarycontactid_value',
            type: 'ILookupValue[]'
        },
        {
            name: 'aging90_base',
            apiName: 'aging90_base',
            type: 'number'
        },
        {
            name: 'aging30',
            apiName: 'aging30',
            type: 'number'
        },
        {
            name: 'owningteam',
            apiName: '_owningteam_value',
            type: 'ILookupValue[]'
        },
        {
            name: 'owneridname',
            apiName: 'owneridname',
            type: 'string'
        },
        {
            name: 'donotbulkemail',
            apiName: 'donotbulkemail',
            type: 'string'
        },
        {
            name: 'address2_name',
            apiName: 'address2_name',
            type: 'string'
        },
        {
            name: 'address1_latitude',
            apiName: 'address1_latitude',
            type: 'number'
        },
        {
            name: 'creditlimit',
            apiName: 'creditlimit',
            type: 'number'
        },
        {
            name: 'marketingonly',
            apiName: 'marketingonly',
            type: 'string'
        },
        {
            name: 'address1_composite',
            apiName: 'address1_composite',
            type: 'string'
        },
        {
            name: 'primarysatoriid',
            apiName: 'primarysatoriid',
            type: 'string'
        },
        {
            name: 'address1_country',
            apiName: 'address1_country',
            type: 'string'
        },
        {
            name: 'telephone2',
            apiName: 'telephone2',
            type: 'string'
        },
        {
            name: 'createdbyexternalpartyname',
            apiName: 'createdbyexternalpartyname',
            type: 'string'
        },
        {
            name: 'lastusedincampaign',
            apiName: 'lastusedincampaign',
            type: 'Date'
        },
        {
            name: 'accountnumber',
            apiName: 'accountnumber',
            type: 'string'
        },
        {
            name: 'address1_line3',
            apiName: 'address1_line3',
            type: 'string'
        },
        {
            name: 'masterid',
            apiName: '_masterid_value',
            type: 'ILookupValue[]'
        },
        {
            name: 'primarycontactidname',
            apiName: 'primarycontactidname',
            type: 'string'
        },
        {
            name: 'timespentbymeonemailandmeetings',
            apiName: 'timespentbymeonemailandmeetings',
            type: 'string'
        },
        {
            name: 'address1_primarycontactname',
            apiName: 'address1_primarycontactname',
            type: 'string'
        },
        {
            name: 'donotphone',
            apiName: 'donotphone',
            type: 'string'
        },
        {
            name: 'preferredsystemuseridname',
            apiName: 'preferredsystemuseridname',
            type: 'string'
        },
        {
            name: 'address2_freighttermscode',
            apiName: 'address2_freighttermscode',
            type: 'string'
        },
        {
            name: 'address2_postofficebox',
            apiName: 'address2_postofficebox',
            type: 'string'
        },
        {
            name: 'donotsendmm',
            apiName: 'donotsendmm',
            type: 'string'
        },
        {
            name: 'parentaccountid',
            apiName: '_parentaccountid_value',
            type: 'ILookupValue[]'
        },
        {
            name: 'preferredsystemuserid',
            apiName: '_preferredsystemuserid_value',
            type: 'ILookupValue[]'
        },
        {
            name: 'slaid',
            apiName: '_slaid_value',
            type: 'ILookupValue[]'
        },
        {
            name: 'slaname',
            apiName: 'slaname',
            type: 'string'
        },
        {
            name: 'address2_upszone',
            apiName: 'address2_upszone',
            type: 'string'
        },
        {
            name: 'ftpsiteurl',
            apiName: 'ftpsiteurl',
            type: 'string'
        },
        {
            name: 'isprivate',
            apiName: 'isprivate',
            type: 'string'
        },
        {
            name: 'sic',
            apiName: 'sic',
            type: 'string'
        },
        {
            name: 'address2_line1',
            apiName: 'address2_line1',
            type: 'string'
        },
        {
            name: 'lastonholdtime',
            apiName: 'lastonholdtime',
            type: 'Date'
        },
        {
            name: 'address1_telephone1',
            apiName: 'address1_telephone1',
            type: 'string'
        },
        {
            name: 'address1_telephone2',
            apiName: 'address1_telephone2',
            type: 'string'
        },
        {
            name: 'description',
            apiName: 'description',
            type: 'string'
        },
        {
            name: 'stageid',
            apiName: 'stageid',
            type: 'string'
        },
        {
            name: 'address2_addresstypecode',
            apiName: 'address2_addresstypecode',
            type: 'string'
        },
        {
            name: 'accountid',
            apiName: 'accountid',
            type: 'string'
        },
        {
            name: 'stockexchange',
            apiName: 'stockexchange',
            type: 'string'
        },
        {
            name: 'address1_addressid',
            apiName: 'address1_addressid',
            type: 'string'
        },
        {
            name: 'address2_utcoffset',
            apiName: 'address2_utcoffset',
            type: 'number'
        },
        {
            name: 'statecode',
            apiName: 'statecode',
            type: 'number'
        },
        {
            name: 'address2_city',
            apiName: 'address2_city',
            type: 'string'
        },
        {
            name: 'address1_freighttermscode',
            apiName: 'address1_freighttermscode',
            type: 'string'
        },
        {
            name: 'address2_latitude',
            apiName: 'address2_latitude',
            type: 'number'
        },
        {
            name: 'merged',
            apiName: 'merged',
            type: 'string'
        },
        {
            name: 'traversedpath',
            apiName: 'traversedpath',
            type: 'string'
        },
        {
            name: 'onholdtime',
            apiName: 'onholdtime',
            type: 'number'
        },
        {
            name: 'address1_line1',
            apiName: 'address1_line1',
            type: 'string'
        },
        {
            name: 'address1_postofficebox',
            apiName: 'address1_postofficebox',
            type: 'string'
        },
        {
            name: 'primarytwitterid',
            apiName: 'primarytwitterid',
            type: 'string'
        },
        {
            name: 'donotfax',
            apiName: 'donotfax',
            type: 'string'
        },
        {
            name: 'customersizecode',
            apiName: 'customersizecode',
            type: 'string'
        },
        {
            name: 'address2_telephone1',
            apiName: 'address2_telephone1',
            type: 'string'
        },
        {
            name: 'address2_telephone2',
            apiName: 'address2_telephone2',
            type: 'string'
        },
        {
            name: 'address2_telephone3',
            apiName: 'address2_telephone3',
            type: 'string'
        },
        {
            name: 'preferredappointmentdaycode',
            apiName: 'preferredappointmentdaycode',
            type: 'string'
        },
        {
            name: 'createdbyexternalparty',
            apiName: '_createdbyexternalparty_value',
            type: 'ILookupValue[]'
        },
        {
            name: 'customertypecode',
            apiName: 'customertypecode',
            type: 'string'
        },
        {
            name: 'donotemail',
            apiName: 'donotemail',
            type: 'string'
        },
        {
            name: 'createdbyname',
            apiName: 'createdbyname',
            type: 'string'
        },
        {
            name: 'accountcategorycode',
            apiName: 'accountcategorycode',
            type: 'string'
        },
        {
            name: 'tickersymbol',
            apiName: 'tickersymbol',
            type: 'string'
        },
        {
            name: 'address2_primarycontactname',
            apiName: 'address2_primarycontactname',
            type: 'string'
        },
        {
            name: 'creditonhold',
            apiName: 'creditonhold',
            type: 'string'
        },
        {
            name: 'address1_addresstypecode',
            apiName: 'address1_addresstypecode',
            type: 'string'
        },
        {
            name: 'address1_fax',
            apiName: 'address1_fax',
            type: 'string'
        },
        {
            name: 'followemail',
            apiName: 'followemail',
            type: 'string'
        },
        {
            name: 'name',
            apiName: 'name',
            type: 'string'
        },
        {
            name: 'participatesinworkflow',
            apiName: 'participatesinworkflow',
            type: 'string'
        },
        {
            name: 'telephone3',
            apiName: 'telephone3',
            type: 'string'
        },
        {
            name: 'address1_telephone3',
            apiName: 'address1_telephone3',
            type: 'string'
        },
        {
            name: 'sharesoutstanding',
            apiName: 'sharesoutstanding',
            type: 'number'
        },
        {
            name: 'address1_postalcode',
            apiName: 'address1_postalcode',
            type: 'string'
        },
    ]);