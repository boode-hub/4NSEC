const e=[{id:`2ec6e0a6-76b7-4c5f-ade6-a8551eb47a97`,description:`Android 7+ Call History database`,csvPrefix:`Android7plus`,fileName:`Calllog.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='calls');`,identifyValue:`1`,queries:[{name:`Calls`,query:`select
_id,
number,
name,
datetime(date/1000,'UNIXEPOCH','localtime') AS "date",
duration,
case
when type = 2 then "outgoing"
when type = 1 then "incoming"
when type = 4 then "voicemail"
end AS "Call Type",
subscription_id,
phone_account_address,
geocoded_location,
formatted_number,
datetime(last_modified/1000,'UNIXEPOCH','localtime') AS "modified date",
case
when deleted = 1 then "deleted"
else "N/A"
end AS "Deleted",
case
when dirty = 1 then "Dirty"
else "N/A"
end AS "Valid Entry" --most voicemail calls will get a status of dirty with a type of "4"
from calls
`,baseFileName:`CallHistory`,blobColumns:[]}]},{id:`60b52b68-5040-4913-bcf5-ebfb185bf6cb`,description:`Android - Contacts2.db`,csvPrefix:`Android`,fileName:`contacts2.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='agg_exceptions' OR name='default_directory' OR name='location' OR name='phone_lookup' OR name='data_usage_stat' OR name='raw_contacts' OR name='accounts' OR name='speed_dial' OR name='v1_settings' OR name='visible_contacts' OR name='photo_files' OR name='presence' OR name='pre_authorized_uris' OR name='nickname_lookup' OR name='mimetypes' OR name='_sync_state' OR name='android_metadata' OR name='deleted_contacts');`,identifyValue:`18`,queries:[{name:`Accounts`,query:`SELECT
accounts._id AS ID,
accounts.account_name AS AccountName,
accounts.account_type AS AccountType,
CASE

WHEN accounts.sec_supports_uploading = 0 THEN
'No'
WHEN accounts.sec_supports_uploading = 1 THEN
'Yes'
END AS "SecSupportsUploading"
FROM
accounts
`,baseFileName:`Contacts2DB_Accounts`,blobColumns:[]},{name:`Properties`,query:`SELECT
properties.property_key AS PropertyKey,
properties.property_value AS PropertyValue
FROM
properties
`,baseFileName:`Contacts2DB_Properties`,blobColumns:[]},{name:`Settings`,query:`SELECT
settings.account_name AS AccountName,
settings.account_type AS AccountType,
CASE

WHEN settings.ungrouped_visible = 0 THEN
'No'
WHEN settings.ungrouped_visible = 1 THEN
'Yes'
END AS "UngroupedVisible",
CASE

WHEN settings.should_sync = 0 THEN
'No'
WHEN settings.should_sync = 1 THEN
'Yes'
END AS "ShouldSync"
FROM
settings
`,baseFileName:`Contacts2DB_Settings`,blobColumns:[]},{name:`Contacts`,query:`SELECT
raw_contacts._id AS ID,
raw_contacts.creation_time AS CreationTime,
CASE

WHEN contacts.pinned = 0 THEN
'No'
WHEN contacts.pinned = 1 THEN
'Yes'
END AS "ContactPinned",
CASE

WHEN contacts.starred = 0 THEN
'No'
WHEN contacts.starred = 1 THEN
'Yes'
END AS "ContactStarred",
CASE

WHEN data.is_read_only = 0 THEN
'No'
WHEN data.is_read_only = 1 THEN
'Yes'
END AS "IsReadOnly",
CASE

WHEN data.is_primary = 0 THEN
'No'
WHEN data.is_primary = 1 THEN
'Yes'
END AS "IsPrimary",
CASE

WHEN data.is_super_primary = 0 THEN
'No'
WHEN data.is_super_primary = 1 THEN
'Yes'
END AS "IsSuperPrimary",
CASE

WHEN contacts.send_to_voicemail = 0 THEN
'No'
WHEN contacts.send_to_voicemail = 1 THEN
'Yes'
END AS "SendToVoicemail",
CASE

WHEN contacts.has_phone_number = 0 THEN
'No'
WHEN contacts.has_phone_number = 1 THEN
'Yes'
END AS "HasPhoneNumber",
CASE

WHEN contacts.has_email = 0 THEN
'No'
WHEN contacts.has_email = 1 THEN
'Yes'
END AS "HasEmail",
CASE

WHEN contacts.is_private = 0 THEN
'No'
WHEN contacts.is_private = 1 THEN
'Yes'
END AS "IsPrivate",
contacts.times_contacted AS TimesContacted,
datetime( contacts.last_time_contacted / 1000, 'unixepoch', 'localtime' ) AS LastTimeContacted,
datetime( contacts.contact_last_updated_timestamp / 1000, 'unixepoch', 'localtime' ) AS ContactLastUpdated
FROM
raw_contacts
LEFT JOIN contacts ON raw_contacts.contact_id = contacts._id
AND raw_contacts._id = contacts.name_raw_contact_id
LEFT JOIN data ON contacts.photo_id = data._id
AND contacts.status_update_id = data._id
AND raw_contacts._id = data.raw_contact_id
`,baseFileName:`Contacts2DB_Contacts`,blobColumns:[]},{name:`ContactsWithDisplayNames`,query:`SELECT
Group_Concat( DISTINCT accounts.account_name ) AS AccountName,
raw_contacts.display_name AS DisplayName,
phone_lookup.normalized_number AS NormalizedNumber
FROM
accounts
INNER JOIN raw_contacts ON raw_contacts.account_id = accounts._id
INNER JOIN phone_lookup ON phone_lookup.raw_contact_id = raw_contacts._id
GROUP BY
raw_contacts.display_name,
phone_lookup.normalized_number
`,baseFileName:`Contacts2DB_ContactsDisplayNames`,blobColumns:[]}]},{id:`10909a28-943e-4363-bbdc-617feac432c0`,description:`Android Frosting Application Tracker database`,csvPrefix:`Android`,fileName:`frosting.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='frosting');`,identifyValue:`1`,queries:[{name:`Frosting`,query:`select
pk,
apk_path,
datetime(last_updated/1000,'UNIXEPOCH','localtime') AS "Last Updated",
data
from frosting
`,baseFileName:`FrostingDB`,blobColumns:[]}]},{id:`cec6722d-ec1a-452b-9c02-920cd3477f8f`,description:`Android Application Tracker database`,csvPrefix:`Android`,fileName:`localappstate.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='appstate' OR name='android_metadata');`,identifyValue:`2`,queries:[{name:`Localappstate`,query:`SELECT
package_name,
case
when auto_update = 1 then "AutoUpdate Set"
else "No AutoUpdate"
end AS "AutoUpdate Status",
delivery_data,
DateTime(delivery_data_timestamp_ms / 1000, 'UNIXEPOCH') As "Delivery Date",
DateTime(first_download_ms / 1000, 'UNIXEPOCH') As "First Download Date",
account,
title,
last_notified_version,
datetime(last_update_timestamp_ms/ 1000, 'UNIXEPOCH') As "Last Update",
datetime(install_request_timestamp_ms/ 1000, 'UNIXEPOCH') As "Install Request Date"
From appstate
`,baseFileName:`LocalAppstateDB`,blobColumns:[]}]},{id:`d9bdc64c-a59a-426d-a489-2c1c35b2ea8b`,description:`Samsung Logs database`,csvPrefix:`Android`,fileName:`logs.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='logs');`,identifyValue:`1`,queries:[{name:`Log Snippets`,query:`SELECT
_id,
number,
DateTime(date / 1000, 'UNIXEPOCH') AS "Date",
name,
account_name,
m_content
FROM logs
`,baseFileName:`LogsDB`,blobColumns:[]}]},{id:`11cd4add-f57d-48f4-bd1b-07deb3b3442a`,description:`Android - mmssms.db`,csvPrefix:`Android`,fileName:`mmssms.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='words_content' OR name='wpm' OR name='words_segments' OR name='im_threads' OR name='part' OR name='pdu' OR name='ft_retry' OR name='drm' OR name='cmas' OR name='im' OR name='im_threads' OR name='bin_im' OR name='bin_part' OR name='bin_addr' OR name='attachments' OR name='categories' OR name='spam_ft' OR name='ft' OR name='words' OR name='canonical_address');`,identifyValue:`18`,queries:[{name:`SMS`,query:`SELECT
_id AS SmsID,
thread_id AS SmsThreadID,
address AS SmsAddress,
datetime( date / 1000, 'unixepoch', 'localtime' ) AS Date,
datetime( date_sent / 1000, 'unixepoch', 'localtime' ) AS DateSent,
CASE

WHEN read = 0 THEN
'No'
WHEN read = 1 THEN
'Yes'
END AS Read,
CASE

WHEN type = 1 THEN
'Outgoing Message'
WHEN type = 2 THEN
'Incoming Message'
END AS Type,
subject AS Subject,
body AS Body,
service_center AS ServiceCenter,
creator AS Creator,
CASE

WHEN seen = 0 THEN
'No'
WHEN seen = 1 THEN
'Yes'
END AS Seen,
sim_slot,
sim_imsi,
CASE

WHEN hidden = 0 THEN
'No'
WHEN hidden = 1 THEN
'Yes'
END AS Hidden
FROM
sms
WHERE
type = 1
OR type = 2
`,baseFileName:`mmssmsDB_SMSMessages`,blobColumns:[]}]},{id:`c4904a4f-041a-4872-8763-4f55917c873a`,description:`Android SMS database`,csvPrefix:`Android`,fileName:`mmssms.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='SMS' or name='part' or name='addr' OR name='mmssms');`,identifyValue:`4`,queries:[{name:`SMS`,query:`select
   mmssms._id,
   mmssms.msg_type,
   case
   when mmssms.type = 2 then "incoming"
   when mmssms.type = 1 then "outgoing"
   end AS "message status",
   mmssms.address,
   datetime(mmssms.date/1000,'UNIXEPOCH','localtime') AS "date",
   mmssms.body AS "message",
   mmssms_tag.tag AS "unread"
   from mmssms
   left join mmssms_tag on mmssms_tag._id=mmssms._id
`,baseFileName:`SMSDB`,blobColumns:[]}]},{id:`db337b07-2e96-4052-91df-f230dfbd232e`,description:`iOS Accounts (3) database`,csvPrefix:`iOS`,fileName:`accounts3.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='ZACCOUNT');`,identifyValue:`1`,queries:[{name:`Accounts`,query:`SELECT
Z_PK,
ZACCOUNTTYPE AS "Account Type",
ZPARENTACCOUNT AS "Parent Account",
ZUSERNAME AS "Username",
DATETIME(ZDATE+978307200,'UNIXEPOCH') AS "TIMESTAMP",
ZACCOUNTDESCRIPTION AS "Account Description",
ZIDENTIFIER AS "Identifier",
ZOWNINGBUNDLEID AS "Bundle ID"
FROM ZACCOUNT
`,baseFileName:`AccountsDB`,blobColumns:[]}]},{id:`08155974-3246-40c0-aaba-a5bc89bacf8e`,description:`iOS Accounts (4) database`,csvPrefix:`Accounts`,fileName:`accounts4.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='ZACCOUNT');`,identifyValue:`1`,queries:[{name:`Accounts`,query:`SELECT
Z_PK,
ZACCOUNTTYPE AS "Account Type",
ZPARENTACCOUNT AS "Parent Account",
ZUSERNAME AS "Username",
DATETIME(ZDATE+978307200,'UNIXEPOCH') AS "TIMESTAMP",
ZACCOUNTDESCRIPTION AS "Account Description",
ZIDENTIFIER AS "Identifier",
ZOWNINGBUNDLEID AS "Bundle ID"
FROM ZACCOUNT
`,baseFileName:`Accounts`,blobColumns:[]}]},{id:`3b782af4-0073-4b08-b955-eb8a3af7bf99`,description:`iOS 8+ Call History database`,csvPrefix:`Calls`,fileName:`callhistory.storedata`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='ZCALLRECORD');`,identifyValue:`1`,queries:[{name:`Calls`,query:`select
z_pk AS "Call Sequence #",
zaddress AS "Phone Number",
zduration AS "Call in Seconds",
case
when zoriginated = 0 then "Incoming"
when zoriginated = 1 then "Outgoing"
end AS "Call Direction",
case
when zanswered = 0 then "Call Missed"
when zanswered = 1 then "Call Answered"
end as "Call Status",
datetime(zdate+978307200,'unixepoch','localtime') AS "Timestamp"
from zcallrecord
`,baseFileName:`Calls`,blobColumns:[]}]},{id:`3d56413c-2057-462f-88a2-6ccd02d35985`,description:`CellularUsage database`,csvPrefix:`iOS`,fileName:`CellularUsage.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='subscriber_info');`,identifyValue:`1`,queries:[{name:`CellularUsage`,query:`SELECT
ROWID,
subscriber_id AS "ICCID",
subscriber_mdn AS "Phone Number",
datetime(last_update_time+978307200,'UNIXEPOCH','localtime') AS "Last Updated"
FROM subscriber_info
`,baseFileName:`Cellular_SimUsage`,blobColumns:[]}]},{id:`3206c59d-d3af-4424-a991-eb7c759a9f0b`,description:`HealthDb Secure database`,csvPrefix:`iOS`,fileName:`healthdb_secure.sqlite`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='workouts' OR name='workout_events' OR name='medical_records' OR name='clinical accounts' OR name='data_provences' OR name='devices' OR name='fitness_friend_activity_snapshots' OR name='vaccination_record_samples' or name='samples');`,identifyValue:`7`,queries:[{name:`Samples`,query:`Select
datetime(samples.start_date+978307200,'unixepoch','localtime') as "Start Date",
datetime(samples.end_date+978307200,'unixepoch','localtime') as "End Date",
samples.data_id,
case
when samples.data_type = 3 then "weight"
when samples.data_type = 7 then "steps"
when samples.data_type = 8 then "dist in m"
when samples.data_type = 9 then "resting energy"
when samples.data_type = 10 then "active energy"
when samples.data_type = 12 then "flights climbed"
when samples.data_type = 67 then "weekly calorie goal"
when samples.data_type = 70 then "watch on"
when samples.data_type = 75 then "stand"
when samples.data_type = 76 then "activity"
when samples.data_type = 79 then "workout"
when samples.data_type = 83 then "some workouts"
end as "activity type",
quantity,
original_quantity,
unit_strings.unit_string,
original_unit,
correlations.correlation,
correlations.object,
correlations.provenance
string_value,
metadata_values.data_value,
metadata_values.numerical_value,
metadata_values.value_type,
metadata_keys.key
from samples
left outer join quantity_samples on samples.data_id = quantity_samples.data_id
left outer join unit_strings on quantity_samples.original_unit = unit_strings.RowID
left outer join correlations on samples.data_id = correlations.object
left outer join metadata_values on metadata_values.object_id = samples.data_id
left outer join metadata_keys on metadata_keys.ROWID = metadata_values.key_id
order by "Start Date" desc
`,baseFileName:`HealthDBSecureSamples`,blobColumns:[]}]},{id:`1d8a9b0e-cd36-4045-939b-54e4fdc90861`,description:`Health Db database`,csvPrefix:`iOS`,fileName:`healthdb.sqlite`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='workout_sessions' OR name='alarm_events' OR name='workout_builders' OR name='sources' OR name='sync_stores' OR name='source_devices');`,identifyValue:`6`,queries:[{name:`Device history`,query:`SELECT
manufacturer,
hardware,
software,
datetime(source_devices.creation_date+978307200,'unixepoch') AS "iOS_Install_or_Upgrade_Date"
FROM
source_devices
`,baseFileName:`HealthDBDeviceHistory`,blobColumns:[]}]},{id:`e740e01a-c964-43aa-9b93-1147ee08b358`,description:`iOS Photos database`,csvPrefix:`iOS`,fileName:`Photos.sqlite`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='ZALBUMLIST' OR name='ZMOMENT' OR name='Z_PRIMARYKEY' OR name='ZCODEC' OR name='ZGENERICASSET');`,identifyValue:`5`,queries:[{name:`Moments`,query:`Select
ZGENERICASSET.Z_PK,
CASE
when ZGENERICASSET.ZTRASHEDSTATE = 1 then "Deleted"
when ZGENERICASSET.ZTRASHEDSTATE = 0 then "Not Deleted"
end AS "State" ,
datetime(ZGENERICASSET.ZADDEDDATE+978307200,'UNIXEPOCH') AS "Added",
datetime(ZGENERICASSET.ZLASTSHAREDDATE+978307200,'UNIXEPOCH') AS "Last Shared",
ZGENERICASSET.ZLATITUDE AS "Latitude",
ZGENERICASSET.ZLONGITUDE AS "Longitude",
datetime(ZGENERICASSET.ZMODIFICATIONDATE+978307200,'UNIXEPOCH') AS "Modified",
datetime(ZGENERICASSET.ZTRASHEDDATE+978307200,'UNIXEPOCH') AS "Deleted Date",
ZGENERICASSET.ZDIRECTORY AS "Directory",
ZGENERICASSET.ZFILENAME AS "Filename",
ZGENERICASSET.ZLOCATIONDATA AS "Blob Location",
ZMOMENT.ZAPPROXIMATELATITUDE AS "Approximate Latitude",
ZMOMENT.ZAPPROXIMATELONGITUDE AS "Approximate Longitude",
datetime(ZMOMENT.ZSTARTDATE+978307200,'UNIXEPOCH') AS "Moment Start Date",
datetime(ZMOMENT.ZENDDATE+978307200,'UNIXEPOCH') AS "Moment End Date"
From ZGENERICASSET
left join zmoment on zmoment.z_pk=zgenericasset.zmoment
`,baseFileName:`PhotosDB_Moments`,blobColumns:[]}]},{id:`79863e25-3cd2-4122-92af-50284edc9663`,description:`iOS SMS database`,csvPrefix:`iOS`,fileName:`sms.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='attachment' OR name='chat' OR name='deleted_messages' OR name='handle' OR name='sync_deleted_chats' OR name='sync_deleted_attachments' OR name='sync_deleted_messages' oR name='message');`,identifyValue:`8`,queries:[{name:`SMS and iMessage`,query:`SELECT message.rowid,
chat_message_join.chat_id,
message.handle_id,
message.text,
message.service,
message.account,
chat.account_login,
chat.chat_identifier,
case when LENGTH(chat_message_join.message_date)=18 then
datetime(chat_message_join.message_date/1000000000 + 978307200,'unixepoch','localtime')
when LENGTH(chat_message_join.message_date)=9 then
datetime(chat_message_join.message_date + 978307200,'unixepoch','localtime')
else 'NA'
END as "Message Date",
case when LENGTH(message.date_read)=18 then
datetime(message.date_read/1000000000 + 978307200,'unixepoch','localtime')
when LENGTH(message.date_read)=9 then
datetime(message.date_read+978307200,'unixepoch','localtime')
else 'NA'
END as "Date Read",
case when message.is_read=1
then 'Incoming'
when message.is_read=0
then 'Outgoing'
end as "Message Direction",
case when LENGTH(chat.last_read_message_timestamp)=18 then
datetime(chat.last_read_message_timestamp/1000000000+978307200,'unixepoch','localtime')
when LENGTH(chat.last_read_message_timestamp)=9 then
datetime(chat.last_read_message_timestamp + 978307200,'unixepoch','localtime')
else 'NA'
END as "Last Read",
attachment.filename,
datetime(attachment.created_date+978307200,'unixepoch','localtime') AS "Attachment Date",
attachment.mime_type,
attachment.total_bytes
FROM message
left join chat_message_join on chat_message_join.message_id=message.ROWID
left join chat on chat.ROWID=chat_message_join.chat_id
left join attachment on attachment.ROWID=chat_message_join.chat_id
order by message.date_read desc;
`,baseFileName:`SMSDB`,blobColumns:[]}]},{id:`a1b2c3d4-e5f6-7890-1234-567890abcdeh`,description:`Test map for blob extraction with custom naming and extensions`,csvPrefix:`BlobTest`,fileName:`BlobTest_Three.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND name='TestBlobs'`,identifyValue:`1`,queries:[{name:`ExtractBlobsWithExtensions`,query:`SELECT Id, Name, Data, DataTwo FROM TestBlobs ORDER BY Id ASC`,baseFileName:`ExtractedBlobs`,blobColumns:[`Data`,`DataTwo`]}]},{id:`a1b2c3d4-e5f6-7890-1234-567890abcdeg`,description:`Test map for blob extraction with custom naming`,csvPrefix:`BlobTest`,fileName:`BlobTest_Two.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND name='TestBlobs'`,identifyValue:`1`,queries:[{name:`ExtractBlobs`,query:`SELECT Id, Name, Data FROM TestBlobs ORDER BY Id ASC`,baseFileName:`ExtractedBlobs`,blobColumns:[`Data`]}]},{id:`a1b2c3d4-e5f6-7890-1234-567890abcdef`,description:`Test map for blob extraction`,csvPrefix:`BlobTest`,fileName:`BlobTest.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND name='TestBlobs'`,identifyValue:`1`,queries:[{name:`ExtractBlobs`,query:`SELECT Id, Name, Data FROM TestBlobs ORDER BY Id ASC`,baseFileName:`ExtractedBlobs`,blobColumns:[`Data`]}]},{id:`af5bcf3f-b316-4e49-8d12-ce9e180b3914`,description:`Some rando cars database`,csvPrefix:`Cars`,fileName:`CarsDB.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='Cars' OR name='CarScheduling' OR name='Customers');`,identifyValue:`3`,queries:[{name:`Company names`,query:`select Company from Customers;`,baseFileName:`Companies`,blobColumns:[]},{name:`Order payment type and amount, ordered`,query:`select CustomerID,PaymentType,PaymentAmount from Orders ORDER BY PaymentAmount,PaymentType;`,baseFileName:`PaymentTypeAndAmounts`,blobColumns:[]},{name:`Distinct descriptions`,query:`select distinct Description from CarScheduling`,baseFileName:`DistinctDescription`,blobColumns:[]},{name:`Make and model`,query:`select Trademark,Model from cars ORDER BY Trademark`,baseFileName:`MakeModel`,blobColumns:[]}]},{id:`83b99299-2d84-4844-af25-c727d3440b19`,description:`Some rando contacts database example`,csvPrefix:`Contacts`,fileName:`Contacts.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='Customers' OR name='Total');`,identifyValue:`2`,queries:[{name:`Customers table users`,query:`SELECT FirstName,LastName from Customers`,baseFileName:`Users`,blobColumns:[]},{name:`Another Customers table query`,query:`SELECT Id,State as Wizzo from Customers`,baseFileName:`StateIdInfo`,blobColumns:[]},{name:`JoinExample`,query:`SELECT Total.ID, Customers.FirstName || ' ' || Customers.LastName AS CustomerName, Total.Year, Total.January, Total.February, Total.March, Total.April, Total.May, Total.June, Total.July, Total.August, Total.September, Total.October, Total.November, Total.December FROM         Customers INNER JOIN Total ON Customers.ID = Total.CustomerID`,baseFileName:`JoinExample`,blobColumns:[]},{name:`SomeThingElse`,query:`SELECT Id,State as Wizzo froM Customers`,baseFileName:`AnotherExample`,blobColumns:[]}]},{id:`ff0293ee-f646-4507-ade7-dc058d3e998e`,description:`4K Video Downloader`,csvPrefix:`4KVideoDownloader`,fileName:`random.sqlite`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='media_item_description' OR name='url_description' OR name='media_info' OR name='audio_info' OR name='video_info' OR name='url_description');`,identifyValue:`6`,queries:[{name:`4K Video Downloader`,query:`SELECT
audio_info.id AS ID,
url_description.service_name AS ServiceName,
media_item_description.title AS Title,
url_description.url AS URL,
download_item.filename AS Filename,
media_item_description.duration / 1000 / 60 AS 'Duration (Minutes)',
audio_info.bitrate / 1000 AS 'Bitrate (kbps)',
CASE

WHEN video_info.video_360 = 0 THEN
'No'
WHEN video_info.video_360 = 1 THEN
'Yes'
END AS Video360,
CASE

WHEN video_info.hdr = 0 THEN
'No'
WHEN video_info.hdr = 1 THEN
'Yes'
END AS VideoHDR
FROM
download_item
LEFT JOIN media_item_description ON download_item.id = media_item_description.id
LEFT JOIN url_description ON media_item_description.id = url_description.id
NATURAL LEFT JOIN media_info
LEFT JOIN audio_info ON download_item.id = audio_info.id
LEFT JOIN video_info ON media_info.id = video_info.id
AND url_description.id = video_info.id
ORDER BY
ID ASC
`,baseFileName:`History`,blobColumns:[]}]},{id:`d0022b46-3896-4b9f-a9e5-499241eba806`,description:`ActivitiesCache Windows Timeline`,csvPrefix:`Windows`,fileName:`ActivitiesCache.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='Activity' OR name='Activity_PackageId' OR name='ActivityOperation');`,identifyValue:`3`,queries:[{name:`Activity Package Id`,query:`Select substr(hex(ActivityId), 1, 8)
|| '-' || substr(hex(ActivityId), 9, 4)
|| '-' || substr(hex(ActivityId), 13, 4)
|| '-' || substr(hex(ActivityId), 17, 4)
|| '-' || substr(hex(ActivityId), 21, 12) as ActivityId,Platform,PackageName,
datetime(ExpirationTime,'unixepoch','localtime') as ExpirationTime from Activity_PackageId
`,baseFileName:`ActivityPackageId`,blobColumns:[]},{name:`Activity Operation`,query:`Select OperationOrder,AppId,ActivityType,
datetime(LastModifiedTime,'unixepoch','localtime') as LastModifiedTime,
datetime(ExpirationTime,'unixepoch','localtime') as ExpirationTime,
datetime(CreatedTime,'unixepoch','localtime') as CreatedTime,
datetime(EndTime,'unixepoch','localtime') as EndTime,
datetime(LastModifiedOnClient,'unixepoch','localtime') as LastModifiedOnClient,PlatformDeviceId from ActivityOperation;
`,baseFileName:`ActivityOperation`,blobColumns:[]},{name:`Activity`,query:`Select substr(hex(Id), 1, 8)
|| '-' || substr(hex(Id), 9, 4)
|| '-' || substr(hex(Id), 13, 4)
|| '-' || substr(hex(Id), 17, 4)
|| '-' || substr(hex(Id), 21, 12) as Id,payload,
datetime(LastModifiedTime,'unixepoch','localtime') as LastModifiedTime,
datetime(ExpirationTime,'unixepoch','localtime') as ExpirationTime,
datetime(CreatedInCloud,'unixepoch','localtime') as CreatedInCloud,
datetime(StartTime,'unixepoch','localtime') as StartTime,datetime(EndTime,'unixepoch','localtime') as EndTime,
datetime(LastModifiedOnClient,'unixepoch','localtime') as LastModifiedOnClient,
datetime(OriginalLastModifiedOnClient,'unixepoch','localtime') as OriginalLastModifiedOnClient,
ActivityType,IsLocalOnly,ETag,PackageIdHash,PlatformDeviceId from Activity
`,baseFileName:`ActivitiesCacheDB`,blobColumns:[]}]},{id:`c3a9343a-cd65-484e-a8d2-b4e69b9924a1`,description:`Bitdefender Sqlite Antiphishing Database`,csvPrefix:`Bitdefender`,fileName:`Antiphishing.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='aph_cache');`,identifyValue:`1`,queries:[{name:`Bitdefender Antiphishing DB`,query:`SELECT
url AS URL,
result AS Result,
datetime( expire / 1000, 'unixepoch', 'localtime' ) AS ExpireTime
FROM
aph_cache
ORDER BY
ExpireTime ASC;
`,baseFileName:`Antiphishing`,blobColumns:[]}]},{id:`a2341bd2-9fa9-4715-9a86-4fcde59aca432`,description:`Bitdefender Sqlite Quarantine Cache Database`,csvPrefix:`Bitdefender`,fileName:`cache.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='entries');`,identifyValue:`1`,queries:[{name:`Bitdefender cache DB`,query:`SELECT
quarId AS QuarantineID,
path AS FilePath,
threat AS Threat,
size AS Size,
datetime( quartime, 'unixepoch', 'localtime' ) AS QuarantineTime,
datetime( acctime, 'unixepoch', 'localtime' ) AS LastAccessedTime,
datetime( modtime, 'unixepoch', 'localtime' ) AS LastModifiedTime,
usersid AS UserSID
FROM
entries
ORDER BY
QuarantineTime ASC;
`,baseFileName:`cache`,blobColumns:[]}]},{id:`b5341baa-9fa9-4761-9a86-4fca69aca6e8`,description:`Bitdefender Sqlite ES Database`,csvPrefix:`Bitdefender`,fileName:`es.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='es_cache');`,identifyValue:`1`,queries:[{name:`Bitdefender es DB`,query:`SELECT
url AS URL,
md5 AS MD5,
content_size AS ContentSizeBytes,
datetime( expire / 1000, 'unixepoch', 'localtime' ) AS ExpireTime
FROM
es_cache
ORDER BY
ExpireTime ASC;
`,baseFileName:`es`,blobColumns:[]}]},{id:`e5b7cddd-edd9-4717-b51e-10a1b07bca61`,description:`Bitdefender Sqlite RansomwareRecover Database`,csvPrefix:`Bitdefender`,fileName:`RansomwareRecover.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='files' OR name='packs');`,identifyValue:`2`,queries:[{name:`Bitdefender RansomwareRecover DB Files`,query:`SELECT
files.packid AS PackID,
files.path AS Path,
files.restored AS Restored,
files.restored_path AS RestoredPath,
files.extern_itemid AS ExternItemID,
files.extern_groupid AS ExternGroupID,
packs.process AS Process,
packs.restore_attempt_count AS RestoreAttemptCount,
datetime( files.insert_time / 1000, 'unixepoch', 'localtime' ) AS InsertTime,
datetime( files.last_operation_time / 1000, 'unixepoch', 'localtime' ) AS LastOperationTime
FROM
files INNER JOIN packs ON files.packid = packs.uuid
ORDER BY
LastOperationTime ASC;
`,baseFileName:`RansomwareRecover`,blobColumns:[]}]},{id:`7cf6de25-2953-46aa-b555-7a5c7bf35b07`,description:`Chromium Browser Autofill Entries`,csvPrefix:`ChromiumBrowser`,fileName:`Web Data`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='autofill' OR name='credit_cards' OR name='offer_data' OR name='server_addresses' OR name='keywords');`,identifyValue:`5`,queries:[{name:`Chromium Browser Autofill Entries`,query:`SELECT
autofill.name AS Name,
autofill.value AS Value,
autofill.value_lower AS ValueLowercase,
datetime( "date_created", 'unixepoch' ) AS DateCreated,
datetime( "date_last_used", 'unixepoch' ) AS LastUsed,
autofill.count AS Count
FROM
autofill
ORDER BY
autofill.name ASC
`,baseFileName:`AutofillEntries`,blobColumns:[]}]},{id:`f9d9d731-f6d3-43a6-907d-fe10ddc9e334`,description:`Chromium Browser Autofill Profiles`,csvPrefix:`ChromiumBrowser`,fileName:`Web Data`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='autofill' OR name='credit_cards' OR name='offer_data' OR name='server_addresses' OR name='keywords');`,identifyValue:`5`,queries:[{name:`Chromium Browser Autofill Profiles`,query:`SELECT
autofill_profiles.guid AS GUID,
datetime( "date_modified", 'unixepoch' ) AS DateModified,
datetime( "use_date", 'unixepoch' ) AS UseDate,
autofill_profile_names.first_name AS FirstName,
autofill_profile_names.middle_name AS MiddleName,
autofill_profile_names.last_name AS LastName,
autofill_profile_emails.email as EmailAddress,
autofill_profile_phones.number AS PhoneNumber,
autofill_profiles.company_name AS CompanyName,
autofill_profiles.street_address AS StreetAddress,
autofill_profiles.city AS City,
autofill_profiles.state AS State,
autofill_profiles.zipcode AS ZipCode,
autofill_profiles.use_count AS UseCount
FROM
autofill_profiles
INNER JOIN autofill_profile_emails ON autofill_profile_emails.guid = autofill_profiles.guid
INNER JOIN autofill_profile_phones ON autofill_profiles.guid = autofill_profile_phones.guid
INNER JOIN autofill_profile_names ON autofill_profile_phones.guid = autofill_profile_names.guid
ORDER BY
autofill_profiles.guid ASC
`,baseFileName:`AutofillProfiles`,blobColumns:[]}]},{id:`e1849119-3265-4880-a45e-a6029757625d`,description:`Chromium Browser Cookies`,csvPrefix:`ChromiumBrowser`,fileName:`Cookies`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='cookies' OR name='meta');`,identifyValue:`2`,queries:[{name:`Chromium Browser Cookies`,query:`SELECT
datetime ( cookies.creation_utc / 1000000 + ( strftime( '%s', '1601-01-01' ) ), 'unixepoch' ) AS CreationUTC,
datetime ( cookies.expires_utc / 1000000 + ( strftime( '%s', '1601-01-01' ) ), 'unixepoch' ) AS ExpiresUTC,
datetime ( cookies.last_access_utc / 1000000 + ( strftime( '%s', '1601-01-01' ) ), 'unixepoch' ) AS LastAccessUTC,
cookies.host_key AS HostKey,
cookies.name AS Name,
cookies.path AS Path,
CASE

WHEN cookies.is_secure = 1 THEN
'Yes'
WHEN cookies.is_secure = 0 THEN
'No'
END AS IsSecure,
CASE

WHEN cookies.is_httponly = 1 THEN
'Yes'
WHEN cookies.is_httponly = 0 THEN
'No'
END AS IsHttpOnly,
CASE

WHEN cookies.has_expires = 1 THEN
'Yes'
WHEN cookies.has_expires = 0 THEN
'No'
END AS HasExpiration,
CASE

WHEN cookies.is_persistent = 1 THEN
'Yes'
WHEN cookies.is_persistent = 0 THEN
'No'
END AS IsPersistent,
cookies.priority AS Priority,
cookies.source_port AS SourcePort
FROM
cookies
ORDER BY
cookies.creation_utc ASC
`,baseFileName:`Cookies`,blobColumns:[]}]},{id:`0b575bcf-ade3-44e5-8162-eb52a96c2b06`,description:`Chromium Browser Downloads`,csvPrefix:`ChromiumBrowser`,fileName:`History`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='urls' OR name='visits' OR name='downloads' OR name='segments' OR name='keyword_search_terms');`,identifyValue:`5`,queries:[{name:`Chromium Browser Downloads`,query:`SELECT
downloads.id AS ID,
downloads.guid AS GUID,
downloads.current_path AS CurrentPath,
downloads.target_path AS TargetPath,
downloads.original_mime_type AS OriginalMIMEType,
downloads.received_bytes AS ReceivedBytes,
downloads.total_bytes AS TotalBytes,
datetime( downloads.start_time / 1000000 + ( strftime( '%s', '1601-01-01' ) ), 'unixepoch' ) AS StartTime,
datetime( downloads.end_time / 1000000 + ( strftime( '%s', '1601-01-01' ) ), 'unixepoch' ) AS EndTime,
datetime( downloads.opened / 1000000 + ( strftime( '%s', '1601-01-01' ) ), 'unixepoch' ) AS Opened,
datetime( downloads.last_access_time / 1000000 + ( strftime( '%s', '1601-01-01' ) ), 'unixepoch' ) AS LastAccessTime,
downloads.last_modified AS LastModified,
CASE

WHEN downloads.state = 0 THEN
'In Progress'
WHEN downloads.state = 1 THEN
'Complete'
WHEN downloads.state = 2 THEN
'Cancelled'
WHEN downloads.state = 3 THEN
'Interrupted'
WHEN downloads.state = 4 THEN
'Interrupted'
END AS State,
CASE

WHEN downloads.danger_type = 0 THEN
'Not Dangerous'
WHEN downloads.danger_type = 1 THEN
'Dangerous'
WHEN downloads.danger_type = 2 THEN
'Dangerous URL'
WHEN downloads.danger_type = 3 THEN
'Dangerous Content'
WHEN downloads.danger_type = 4 THEN
'Content May Be Malicious'
WHEN downloads.danger_type = 5 THEN
'Uncommon Content'
WHEN downloads.danger_type = 6 THEN
'Dangerous But User Validated'
WHEN downloads.danger_type = 7 THEN
'Dangerous Host'
WHEN downloads.danger_type = 8 THEN
'Potentially Unwanted'
WHEN downloads.danger_type = 9 THEN
'Whitelisted by Policy'
WHEN downloads.danger_type = 10 THEN
'Download Pending Detailed Verdict'
WHEN downloads.danger_type = 11 THEN
'Blocked By Policy Password Protected'
WHEN downloads.danger_type = 12 THEN
'Blocked By Policy Download Too Large'
WHEN downloads.danger_type = 13 THEN
'Sensitive Content Warning'
WHEN downloads.danger_type = 14 THEN
'Sensitive Content Blocked'
WHEN downloads.danger_type = 15 THEN
'Deep Scanned Safe'
WHEN downloads.danger_type = 16 THEN
'Deep Scanned Dangerous But Opened By User'
WHEN downloads.danger_type = 17 THEN
'Prompt For Deep Scanning'
WHEN downloads.danger_type = 18 THEN
'Blocked Unsupported Filetype'
WHEN downloads.danger_type = 19 THEN
'Dangerous Associated With Account Compromise'
WHEN downloads.danger_type = 20 THEN
'Deep Scan Failed'
WHEN downloads.danger_type = 21 THEN
'Encrypted Archive Prompt for Local Password Scanning'
WHEN downloads.danger_type = 22 THEN
'Encrypted Archive Prompt for Local Password Scanning Pending Detailed Verdict'
WHEN downloads.danger_type = 23 THEN
'Blocked by Policy Scan Failed'
END AS DangerType,
CASE

WHEN downloads.interrupt_reason = 0 THEN
'No Interrupt'
WHEN downloads.interrupt_reason = 1 THEN
'File Error'
WHEN downloads.interrupt_reason = 2 THEN
'Access Denied'
WHEN downloads.interrupt_reason = 3 THEN
'Disk Full'
WHEN downloads.interrupt_reason = 5 THEN
'Path Too Long'
WHEN downloads.interrupt_reason = 6 THEN
'File Too Large'
WHEN downloads.interrupt_reason = 7 THEN
'Virus'
WHEN downloads.interrupt_reason = 10 THEN
'Temporary Problem'
WHEN downloads.interrupt_reason = 11 THEN
'Blocked'
WHEN downloads.interrupt_reason = 12 THEN
'Security Check Failed'
WHEN downloads.interrupt_reason = 13 THEN
'Resume Error File Too Short'
WHEN downloads.interrupt_reason = 14 THEN
'File Hash Mismatch'
WHEN downloads.interrupt_reason = 15 THEN
'File Same As Source'
WHEN downloads.interrupt_reason = 20 THEN
'Network Error'
WHEN downloads.interrupt_reason = 21 THEN
'Operation Timed Out'
WHEN downloads.interrupt_reason = 22 THEN
'Connection Lost'
WHEN downloads.interrupt_reason = 23 THEN
'Server Down'
WHEN downloads.interrupt_reason = 24 THEN
'Network Request Invalid'
WHEN downloads.interrupt_reason = 30 THEN
'Server Error'
WHEN downloads.interrupt_reason = 31 THEN
'Range Request Error'
WHEN downloads.interrupt_reason = 32 THEN
'Server Precondition Error'
WHEN downloads.interrupt_reason = 33 THEN
'Unable to get file'
WHEN downloads.interrupt_reason = 34 THEN
'Server Unauthorized'
WHEN downloads.interrupt_reason = 35 THEN
'Server Certificate Problem'
WHEN downloads.interrupt_reason = 36 THEN
'Server Access Forbidden'
WHEN downloads.interrupt_reason = 37 THEN
'Server Unreachable'
WHEN downloads.interrupt_reason = 38 THEN
'Content Length Mismatch'
WHEN downloads.interrupt_reason = 39 THEN
'Cross Origin Redirect'
WHEN downloads.interrupt_reason = 40 THEN
'Cancelled'
WHEN downloads.interrupt_reason = 41 THEN
'Browser Shutdown'
WHEN downloads.interrupt_reason = 50 THEN
'Browser Crashed'
END AS InterruptReason,
downloads.referrer AS ReferrerURL,
downloads.site_url AS SiteURL,
downloads.tab_url AS TabURL,
downloads.tab_referrer_url AS TabReferrerURL,
DownloadURL.url AS DownloadURL
FROM
downloads
INNER JOIN downloads_url_chains AS DownloadURL ON downloads.id = DownloadURL.id
ORDER BY
downloads.id ASC
`,baseFileName:`Downloads`,blobColumns:[]}]},{id:`d13f7b03-3fa3-497b-a3b7-3b7936b46ad4`,description:`Chromium Browser Favicons`,csvPrefix:`ChromiumBrowser`,fileName:`Favicons`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='icon_mapping' OR name='favicons' OR name='favicon_bitmaps');`,identifyValue:`3`,queries:[{name:`Chromium Browser Favicons`,query:`SELECT
favicons.id AS ID,
favicon_bitmaps.icon_id AS IconID,
datetime( favicon_bitmaps.last_updated / 1000000 + ( strftime( '%s', '1601-01-01' ) ), 'unixepoch' ) AS LastUpdated,
icon_mapping.page_url AS PageURL,
favicons.url AS FaviconURL
FROM
favicons
INNER JOIN
icon_mapping
INNER JOIN
favicon_bitmaps
ON icon_mapping.icon_id = favicon_bitmaps.icon_id
AND favicons.id = favicon_bitmaps.icon_id
ORDER BY
favicons.id ASC
`,baseFileName:`Favicons`,blobColumns:[]}]},{id:`1f37cc07-2b10-4c80-b845-84708e4f7429`,description:`Chromium Browser History Visits`,csvPrefix:`ChromiumBrowser`,fileName:`History`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='urls' OR name='visits' OR name='downloads' OR name='segments' OR name='keyword_search_terms');`,identifyValue:`5`,queries:[{name:`Chromium Browser History`,query:`SELECT
urls.id AS ID,
datetime( visits.visit_time / 1000000 + ( strftime( '%s', '1601-01-01' ) ), 'unixepoch' ) AS 'VisitTime (UTC)',
datetime( urls.last_visit_time / 1000000 + ( strftime( '%s', '1601-01-01' ) ), 'unixepoch' ) AS 'LastVisitedTime (UTC)',
urls.title AS URLTitle,
urls.url AS URL,
urls.visit_count AS VisitCount,
urls.typed_count AS TypedCount,
CASE

WHEN urls.hidden = 1 THEN
'Yes'
WHEN urls.hidden = 0 THEN
'No'
END AS Hidden,
visits.id AS VisitID,
visits.from_visit AS FromVisitID,
CAST ( visits.visit_duration AS FLOAT ) / 1000000 AS VisitDurationInSeconds
FROM
urls
LEFT JOIN visits ON urls.id = visits.url
ORDER BY
visits.visit_time ASC;
`,baseFileName:`HistoryVisits`,blobColumns:[]}]},{id:`d968ece4-d24a-4baf-8f07-78da07727712`,description:`Chromium Browser Keyword Searches`,csvPrefix:`ChromiumBrowser`,fileName:`History`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='urls' OR name='visits' OR name='downloads' OR name='segments' OR name='keyword_search_terms');`,identifyValue:`5`,queries:[{name:`Chromium Browser Keyword Searches`,query:`SELECT
keyword_search_terms.keyword_id AS KeywordID,
keyword_search_terms.url_id AS URLID,
datetime( urls.last_visit_time / 1000000 + ( strftime( '%s', '1601-01-01' ) ), 'unixepoch' ) AS LastVisitTime,
keyword_search_terms.term AS KeywordSearchTerm,
urls.title AS Title,
urls.url AS URL
FROM
keyword_search_terms
INNER JOIN urls ON keyword_search_terms.url_id = urls.id
ORDER BY
keyword_search_terms.keyword_id ASC
`,baseFileName:`KeywordSearches`,blobColumns:[]}]},{id:`d8ae6c52-14c8-46af-823f-a406545c4614`,description:`Chromium Browser Masked Credit Cards`,csvPrefix:`ChromiumBrowser`,fileName:`Web Data`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='autofill' OR name='credit_cards' OR name='offer_data' OR name='server_addresses' OR name='keywords');`,identifyValue:`5`,queries:[{name:`Chromium Browser Masked Credit Cards`,query:`SELECT
masked_credit_cards.id AS ID,
masked_credit_cards.status AS Status,
masked_credit_cards.name_on_card AS NameOnCard,
masked_credit_cards.network AS CardNetwork,
masked_credit_cards.last_four AS LastFour,
masked_credit_cards.exp_month AS ExpMonth,
masked_credit_cards.exp_year AS ExpYear,
masked_credit_cards.bank_name AS BankName,
masked_credit_cards.nickname AS CardNickname,
masked_credit_cards.card_issuer AS CardIssuer,
masked_credit_cards.instrument_id AS InstrumentID
FROM
masked_credit_cards
ORDER BY
masked_credit_cards.id ASC
`,baseFileName:`MaskedCreditCards`,blobColumns:[]}]},{id:`4fa46af3-3dc5-4129-baf2-ec02bf09bf77`,description:`Chromium Browser Media History Playback`,csvPrefix:`ChromiumBrowser`,fileName:`Media History`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='origin' OR name='playback' OR name='playbackSession');`,identifyValue:`3`,queries:[{name:`Chromium Browser Media History Playback`,query:`SELECT
playback.id AS ID,
playback.url AS URL,
playback.watch_time_s AS WatchTimeSeconds,
CASE

WHEN playback.has_video = 1 THEN
'Yes'
WHEN playback.has_video = 0 THEN
'No'
END AS HasVideo,
CASE

WHEN playback.has_audio = 1 THEN
'Yes'
WHEN playback.has_audio = 0 THEN
'No'
END AS HasAudio,
datetime( playback.last_updated_time_s + ( strftime( '%s', '1601-01-01' ) ), 'unixepoch', 'localtime' ) AS LastUpdated,
playback.origin_id AS OriginID
FROM
playback
ORDER BY
playback.id ASC
`,baseFileName:`MediaHistoryPlayback`,blobColumns:[]}]},{id:`22fd15b3-3028-4b95-b706-829eca7d1bc4`,description:`Chromium Browser Media History Playback Session`,csvPrefix:`ChromiumBrowser`,fileName:`Media History`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='origin' OR name='playback' OR name='playbackSession');`,identifyValue:`3`,queries:[{name:`Chromium Browser Media History Playback Session`,query:`SELECT
	playbackSession.id AS ID,
	datetime( playbackSession.last_updated_time_s + ( strftime( '%s', '1601-01-01' ) ), 'unixepoch', 'localtime' ) AS LastUpdated,
	playbackSession.url AS URL,
	CAST ( playbackSession.duration_ms AS FLOAT ) / 1000 AS DurationInSeconds,
	CAST ( playbackSession.position_ms AS FLOAT ) / 1000 AS PositionInSeconds,
	playbackSession.title AS Title,
	playbackSession.artist AS Artist,
	playbackSession.album AS Album,
	playbackSession.source_title AS SourceTitle,
	playbackSession.origin_id AS OriginID
FROM
	playbackSession
ORDER BY
	playbackSession.id
`,baseFileName:`MediaHistoryPlaybackSession`,blobColumns:[]}]},{id:`ecca7ec3-3c7d-4c79-a394-091e7d7f4f97`,description:`Chromium Browser Network Action Predictor`,csvPrefix:`ChromiumBrowser`,fileName:`Network Action Predictor`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='resource_prefetch_predictor_host_redirect' OR name='network_action_predictor' OR name='resource_prefetch_predictor_metadata');`,identifyValue:`3`,queries:[{name:`Chromium Browser Network Action Predictor`,query:`SELECT
network_action_predictor.id AS ID,
network_action_predictor.user_text AS UserText,
network_action_predictor.url AS URL,
network_action_predictor.number_of_hits AS NumberOfHits,
network_action_predictor.number_of_misses AS NumberOfMisses
FROM
network_action_predictor,
resource_prefetch_predictor_host_redirect
ORDER BY
network_action_predictor.id ASC
`,baseFileName:`NetworkActionPredictor`,blobColumns:[]}]},{id:`0e137968-371b-4078-9440-a94b3dcf0d2f`,description:`Chromium Browser Omnibox Shortcuts`,csvPrefix:`ChromiumBrowser`,fileName:`Shortcuts`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='meta' OR name='omni_box_shortcuts');`,identifyValue:`2`,queries:[{name:`Chromium Browser Shortcuts`,query:`SELECT
datetime( omni_box_shortcuts.last_access_time / 1000000 + ( strftime( '%s', '1601-01-01' ) ), 'unixepoch' ) AS LastAccessTime,
omni_box_shortcuts.text AS TextTyped,
omni_box_shortcuts.fill_into_edit AS FillIntoEdit,
omni_box_shortcuts.url AS URL,
omni_box_shortcuts.contents AS Contents,
omni_box_shortcuts.description AS Description,
omni_box_shortcuts.type AS Type,
omni_box_shortcuts.keyword AS Keyword,
omni_box_shortcuts.number_of_hits AS TimesSelectedByUser,
omni_box_shortcuts.id AS ID
FROM
omni_box_shortcuts
ORDER BY
omni_box_shortcuts.last_access_time ASC
`,baseFileName:`OmniboxShortcuts`,blobColumns:[]}]},{id:`3b2fc9c8-23ea-4694-82a2-266aa819db3b`,description:`Chromium Browser Top Sites`,csvPrefix:`ChromiumBrowser`,fileName:`Top Sites`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='meta' OR name='top_sites');`,identifyValue:`2`,queries:[{name:`Chromium Browser Top Sites`,query:`SELECT
top_sites.url_rank AS URLRank,
top_sites.url AS URL,
top_sites.title AS Title
FROM
top_sites
ORDER BY
top_sites.url_rank ASC
`,baseFileName:`TopSites`,blobColumns:[]}]},{id:`d5f096d7-3cd2-4613-93bf-b6744fb528a8`,description:`Cylance CHP.DB`,csvPrefix:`Cylance`,fileName:`chp.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='AnalyzedCache' OR name='Quarantine' OR name='AddFileInfo');`,identifyValue:`3`,queries:[{name:`Cylance Analyzed Cache`,query:`SELECT * FROM AnalyzedCache
`,baseFileName:`AnalyzedCache`,blobColumns:[]},{name:`Cylance Quarantine`,query:`SELECT * FROM Quarantine
`,baseFileName:`Quarantine`,blobColumns:[]},{name:`Cylance AddFileInfo`,query:`SELECT * FROM AddFileInfo
`,baseFileName:`AddFileInfo`,blobColumns:[]}]},{id:`69ace2ef-a789-4ec7-9408-b264467e3801`,description:`Dropbox Aggregation database`,csvPrefix:`Dropbox`,fileName:`aggregation.dbx`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='snapshot');`,identifyValue:`1`,queries:[{name:`Dropbox Aggregation database`,query:`SELECT
snapshot."key" AS "Key",
snapshot.value AS "Value(ConvertToJSON)"
FROM
snapshot
ORDER BY
snapshot."key" ASC
`,baseFileName:`AggregationDBX`,blobColumns:[]}]},{id:`4528e3da-e3ec-498e-8325-e104ee969d71`,description:`Dropbox config database`,csvPrefix:`Dropbox`,fileName:`config.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='config');`,identifyValue:`1`,queries:[{name:`Drobpox`,query:`SELECT
   key,
   VALUE
   from config
`,baseFileName:`ConfigurationsDB`,blobColumns:[]}]},{id:`f2b91cc9-d5af-47c7-9bfc-c14ca38d2bc6`,description:`Dropbox Filecache Database`,csvPrefix:`Dropbox`,fileName:`filecache.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='file_journal');`,identifyValue:`1`,queries:[{name:`Drobpox`,query:`SELECT
id,
server_path,
parent_path,
local_host_id,
local_filename,
local_infinite_details,
local_size,
datetime(local_mtime,'unixepoch') AS "Local Modified Time",
datetime(local_ctime,'unixepoch') AS "Local Created Time",
local_attrs,
datetime(local_timestamp,'unixepoch') AS "Local Timestamp",
local_user_id,
Local_sync_type,
updated_filename,
updated_host_id,
updated_size,
datetime(updated_mtime) AS "Updated Modified Time",
datetime(updated_timestamp) AS "Updated Timestamp",
updated_dir,
updated_user_id,
updated_sync_type
from file_journal
order by "local created time" desc
`,baseFileName:`FileCacheDB`,blobColumns:[]}]},{id:`9f59bb9d-387e-49b0-97f8-f3e271787d4b`,description:`Dropbox Icon DB`,csvPrefix:`Dropbox`,fileName:`icon.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='ext_icon_table' OR name='folder_icon_table' OR name='path_icon_table');`,identifyValue:`3`,queries:[{name:`Dropbox Icon DB`,query:`SELECT
datetime( "created_time", 'unixepoch' ) AS CreatedTime,
datetime( "file_mtime", 'unixepoch' ) AS ModifiedTime,
path_icon_table.file_path AS FilePath
FROM
path_icon_table
ORDER BY
path_icon_table.created_time ASC
`,baseFileName:`IconDB`,blobColumns:[]}]},{id:`14d1c0fa-262d-4d50-9ea7-e7f07978e844`,description:`Dropbox Instance database`,csvPrefix:`Dropbox`,fileName:`instance.dbx`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='instance');`,identifyValue:`1`,queries:[{name:`Dropbox`,query:`SELECT
id,
active,
appdata_path,
default_dropbox_path,
default_dropbox_folder_name,
business_name,
uid,
host_id
from instance
`,baseFileName:`InstanceDB`,blobColumns:[]}]},{id:`255c6d03-a065-49dd-b1bd-4cf7c635554a`,description:`Dropbox Non-Local Resources`,csvPrefix:`Dropbox`,fileName:`home.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='activity_feed' OR name='recents' OR name='starred_items' OR name='calendar_items' OR name='sfj_resources');`,identifyValue:`5`,queries:[{name:`Dropbox Non-Local Resources`,query:`SELECT
datetime( nonlocal_resources.server_fetch_timestamp / 1000 + ( strftime( '%ms', '1601-01-01' ) ), 'unixepoch', 'localtime' ) AS timestamp,
nonlocal_resources.account_id AS AccountID,
nonlocal_resources.name AS Name,
nonlocal_resources.url AS URL,
nonlocal_resources.server_path AS ServerPath,
CASE

WHEN nonlocal_resources.is_dir = 0 THEN
'No'
WHEN nonlocal_resources.is_dir = 1 THEN
'Yes'
END AS IsDirectory,
CASE

WHEN nonlocal_resources.is_share = 0 THEN
'No'
WHEN nonlocal_resources.is_share = 1 THEN
'Yes'
END AS IsShare,
nonlocal_resources.resource_type AS ResourceType,
nonlocal_resources.resource_id AS ResourceID
FROM
nonlocal_resources
`,baseFileName:`NonLocalResources`,blobColumns:[]}]},{id:`97a2f126-f939-4516-9c61-8b74a8cf482b`,description:`Dropbox Recent Items`,csvPrefix:`Dropbox`,fileName:`home.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='activity_feed' OR name='recents' OR name='starred_items' OR name='calendar_items' OR name='sfj_resources');`,identifyValue:`5`,queries:[{name:`Dropbox Recent Items`,query:`SELECT
datetime( timestamp / 1000 + ( strftime( '%ms', '1601-01-01' ) ), 'unixepoch', 'localtime' ) AS Timestamp,
recents.account_id AS AccountID,
recents.server_path AS ServerPath,
datetime( server_fetch_timestamp / 1000 + ( strftime( '%ms', '1601-01-01' ) ), 'unixepoch', 'localtime' ) AS ServerFetchTimestamp,
recents.batch_key AS BatchKey,
recents.event_type AS EventType,
CASE

WHEN recents.is_local = 0 THEN
'No'
WHEN recents.is_local = 1 THEN
'Yes'
END AS IsLocal,
recents.keywords AS Keywords,
recents.resource_id AS ResourceID,
recents.resource_type AS ResourceType
FROM
recents
ORDER BY
recents.timestamp ASC
`,baseFileName:`RecentItems`,blobColumns:[]}]},{id:`34366884-7119-4c0f-b252-11457cc8490a`,description:`Dropbox SFJ Resources`,csvPrefix:`Dropbox`,fileName:`home.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='activity_feed' OR name='recents' OR name='starred_items' OR name='calendar_items' OR name='sfj_resources');`,identifyValue:`5`,queries:[{name:`Dropbox SFJ Resources`,query:`SELECT
datetime( server_fetch_timestamp / 1000 + ( strftime( '%ms', '1601-01-01' ) ), 'unixepoch', 'localtime' ) AS ServerFetchTimestamp,
sfj_resources.name AS Name,
sfj_resources.cased_server_path AS ServerPath,
sfj_resources.resource_type AS ResourceType,
sfj_resources.resource_id AS ResourceID,
sfj_resources.account_id AS AccountID,
sfj_resources.icon_override AS IconOverride
FROM
sfj_resources
ORDER BY
sfj_resources.server_fetch_timestamp ASC
`,baseFileName:`SFJResources`,blobColumns:[]}]},{id:`4092c211-3032-41b1-abc3-a2a6b82f0ac3`,description:`Dropbox Starred Items`,csvPrefix:`Dropbox`,fileName:`home.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='activity_feed' OR name='recents' OR name='starred_items' OR name='calendar_items' OR name='sfj_resources');`,identifyValue:`5`,queries:[{name:`Dropbox Starred Items`,query:`SELECT
datetime( timestamp / 1000 + ( strftime( '%ms', '1601-01-01' ) ), 'unixepoch', 'localtime' ) AS timestamp,
starred_items.account_id AS AccountID,
starred_items.server_path AS ServerPath,
CASE

WHEN starred_items.is_starred = 0 THEN
'No'
WHEN starred_items.is_starred = 1 THEN
'Yes'
END AS IsStarred,
starred_items.keywords AS Keywords,
starred_items.paper_path AS PaperPath,
starred_items.persist_state AS PersistState,
starred_items.resource_type AS ResourceType,
starred_items.resource_id AS ResourceID
FROM
starred_items
ORDER BY
starred_items.timestamp ASC
`,baseFileName:`StarredItems`,blobColumns:[]}]},{id:`4ff4d115-8f35-4233-8edd-c1fb74280754`,description:`Dropbox Sync History`,csvPrefix:`Dropbox`,fileName:`sync_history.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='sync_history');`,identifyValue:`1`,queries:[{name:`Dropbox Sync History`,query:`SELECT
datetime( "timestamp", 'unixepoch' ) AS Timestamp,
sync_history.event_type AS EventType,
sync_history.file_event_type AS FileEventType,
sync_history.direction AS Direction,
sync_history.local_path AS LocalPath,
sync_history.file_id AS FileID
FROM
sync_history
ORDER BY
sync_history.timestamp ASC
`,baseFileName:`SyncHistory`,blobColumns:[]}]},{id:`662fdfe2-021b-4404-b899-fe53c55fe3e1`,description:`Dropbox Tray Thumbnails`,csvPrefix:`Dropbox`,fileName:`tray-thumbnails.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='cached_thumbnail_table');`,identifyValue:`1`,queries:[{name:`Dropbox Tray Thumbnails`,query:`SELECT
datetime( "timestamp", 'unixepoch' ) AS Timestamp,
cached_thumbnail_table.file_name AS FileName,
cached_thumbnail_table.blocklist AS BlockList
FROM
cached_thumbnail_table
ORDER BY
cached_thumbnail_table.timestamp ASC
`,baseFileName:`TrayThumbnails`,blobColumns:[]}]},{id:`4d00388b-eab3-42de-b7c6-784d385708d4`,description:`Edge Browser Collections`,csvPrefix:`EdgeBrowser`,fileName:`collectionsSQLite`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='collections' OR name='items');`,identifyValue:`2`,queries:[{name:`Edge Browser Collections - Collections, Items, and Comments`,query:`SELECT
/* Collections table */
datetime(collections.date_created/1000, 'unixepoch', 'utc') AS Collection_CreationUTC,
datetime(collections.date_modified/1000, 'unixepoch', 'utc') AS Collection_ModifiedUTC,
collections.title as Collection_Title,
collections.position as Collection_Position,
collections.is_syncable as Collection_IsSyncable,
collections.suggestion_url as Collection_SuggestionUrl,
collections.suggestion_dismissed as Collection_SuggestionDismissed,
collections.suggestion_type as Collection_SuggestionType,
cast(collections.thumbnail as varchar) as Collection_Thumbnail,
collections.is_custom_thumbnail as Collection_IsCustomThumbnail,
collections.tag as Collection_Tag,
collections.thumbnail_url as Collection_ThumbnailUrl,
collections.is_marked_for_deletion as Collection_IsMarkedForDeletion,

/* Collections_Sync table */
datetime(collections_sync.date_last_synced/1000, 'unixepoch', 'utc') AS CollectionSync_DateLastSynced,
collections_sync.is_syncable AS CollectionSync_IsSyncable,
collections_sync.server_id AS CollectionSync_ServerId,

/* Items table */
case when items.type == "website"
    then datetime(items.date_created, 'unixepoch', 'utc')
    else datetime(items.date_created/1000, 'unixepoch', 'utc')
end AS Item_CreationUTC,
datetime(items.date_modified/1000, 'unixepoch', 'utc') AS Item_ModifiedUTC,
cast(items.source as varchar) AS Item_Source,
items.Title AS Item_Title,
cast(items.entity_blob as varchar) AS Item_EntityBlob,
cast(items.canonical_image_data as varchar) AS Item_CanonicalImageData,
cast(items.third_party_data as varchar) AS Item_ThirdPartyData,
items.favicon_url AS Item_FaviconUrl,
items.text_content AS Item_TextContent,
items.html_content AS Item_HtmlContent,
items.type AS Item_Type,
items.tag AS Item_Tag,

/* Items Offline Data */
items_offline_data.offline_file_data AS Item_OfflineFileData,

/* Items_Sync Data */
datetime(items_sync.date_last_synced/1000, 'unixepoch', 'utc') AS ItemSync_DateLastSynced,
items_sync.is_syncable AS ItemSync_IsSyncable,

/* Comments table */
comments.text as Comment_Text,
comments.properties as Comment_Properties,

/* All the raw fields here */
collections.id as collection_id,
collections.date_created as raw_collection_created,
collections.date_modified as raw_collection_modified,
items.id AS item_id,
items.date_created AS raw_item_created,
items.date_modified AS raw_item_modified,
comments.id as comment_id,
comments.parent_id as comment_parent_id


FROM
items
    left join collections_items_relationship
        on items.id = collections_items_relationship.item_id
    left join collections
        on collections_items_relationship.parent_id = collections.id
    left join collections_sync
        on collections.id = collections_sync.collection_id
    left join comments
        on items.id = comments.parent_id
    left join items_offline_data
        on items.id = items_offline_data.item_id
    left join items_sync
        on items.id = items_sync.item_id

ORDER BY
    Collection_Title ASC, items.date_created DESC
`,baseFileName:`Collections`,blobColumns:[]}]},{id:`2ff9fe76-b191-422b-abf7-976e8e540326`,description:`Edge Browser History Screenshots`,csvPrefix:`EdgeBrowser`,fileName:`History`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='edge_visits');`,identifyValue:`1`,queries:[{name:`Edge Browser History Screenshots`,query:`SELECT
datetime( visit_time / 1000000 + ( strftime( '%s', '1601-01-01' ) ), 'unixepoch' ) as VisitTime,
u.url as URL,
u.title as Title,
ev.data AS Data,
ev.visit_id AS VisitID,
'To view the image match the .csv name and VisitID e.g CSVNAME_262_Data.jpg would be VisitID 262 or use an SQL Browser and navigate to History (file)/edge_visits (table)/data (column)' as Hint
FROM edge_visits ev
JOIN visits v
on v.id = ev.visit_id
JOIN urls u
on u.id=v.url
WHERE ev.data NOT NULL
ORDER BY visit_time ASC;
`,baseFileName:`ScreenshotsList`,blobColumns:[`Data`]}]},{id:`4231f387-d112-458d-8a19-704e91125ea78`,description:`Edge Browser Navigation History`,csvPrefix:`EdgeBrowser`,fileName:`WebAssistDatabase`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND name='navigation_history';`,identifyValue:`1`,queries:[{name:`WebAssistdatabase Navigation History`,query:`SELECT
navigation_history.id AS ID,
datetime(navigation_history.last_visited_time, 'unixepoch') AS 'Last Visited Time',
navigation_history.title AS Title,
navigation_history.url AS URL,
navigation_history.num_visits AS VisitCount
FROM
navigation_history
ORDER BY
navigation_history.last_visited_time ASC;
`,baseFileName:`NavigationHistory`,blobColumns:[]}]},{id:`4529ee5e-088d-4822-8cfe-ccaf46e0b1f9`,description:`EventTranscript.db - Data Sampling`,csvPrefix:`Windows`,fileName:`EventTranscript.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='categories' OR name='event_categories' OR name='event_tags' OR name='events_persisted' OR name='producers' OR name='provider_groups' OR name='tag_descriptions');`,identifyValue:`7`,queries:[{name:`Windows EventTranscript.db BrowsingHistory`,query:`SELECT
CASE

WHEN
events_persisted.sid = 'S-1-0' THEN
'S-1-0 (Null Authority)'
WHEN events_persisted.sid = 'S-1-0-0' THEN
'S-1-0-0 (Nobody)'
WHEN events_persisted.sid = 'S-1-1' THEN
'S-1-1 (World Authority)'
WHEN events_persisted.sid = 'S-1-1-0' THEN
'S-1-1-0 (Everyone)'
WHEN events_persisted.sid = 'S-1-16-0' THEN
'S-1-16-0 (Untrusted Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-12288' THEN
'S-1-16-12288 (High Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-16384' THEN
'S-1-16-16384 (System Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-20480' THEN
'S-1-16-20480 (Protected Process Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-28672' THEN
'S-1-16-28672 (Secure Process Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-4096' THEN
'S-1-16-4096 (Low Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-8192' THEN
'S-1-16-8192 (Medium Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-8448' THEN
'S-1-16-8448 (Medium Plus Mandatory Level)'
WHEN events_persisted.sid = 'S-1-2' THEN
'S-1-2 (Local Authority)'
WHEN events_persisted.sid = 'S-1-2-0' THEN
'S-1-2-0 (Local)'
WHEN events_persisted.sid = 'S-1-2-1' THEN
'S-1-2-1 (Console Logon)'
WHEN events_persisted.sid = 'S-1-3' THEN
'S-1-3 (Creator Authority)'
WHEN events_persisted.sid = 'S-1-3-0' THEN
'S-1-3-0 (Creator Owner)'
WHEN events_persisted.sid = 'S-1-3-1' THEN
'S-1-3-1 (Creator Group)'
WHEN events_persisted.sid = 'S-1-3-2' THEN
'S-1-3-2 (Creator Owner Server)'
WHEN events_persisted.sid = 'S-1-3-3' THEN
'S-1-3-3 (Creator Group Server)'
WHEN events_persisted.sid = 'S-1-3-4' THEN
'S-1-3-4 (Owner Rights)'
WHEN events_persisted.sid = 'S-1-4' THEN
'S-1-4 (Non-unique Authority)'
WHEN events_persisted.sid = 'S-1-5' THEN
'S-1-5 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-1' THEN
'S-1-5-1 (Dialup)'
WHEN events_persisted.sid = 'S-1-5-10' THEN
'S-1-5-10 (Principal Self)'
WHEN events_persisted.sid = 'S-1-5-11' THEN
'S-1-5-11 (Authenticated Users)'
WHEN events_persisted.sid = 'S-1-5-12' THEN
'S-1-5-12 (Restricted Code)'
WHEN events_persisted.sid = 'S-1-5-13' THEN
'S-1-5-13 (Terminal Server Users)'
WHEN events_persisted.sid = 'S-1-5-14' THEN
'S-1-5-14 (Remote Interactive Logon)'
WHEN events_persisted.sid = 'S-1-5-15' THEN
'S-1-5-15 (This Organization)'
WHEN events_persisted.sid = 'S-1-5-17' THEN
'S-1-5-17 (IUSR)'
WHEN events_persisted.sid = 'S-1-5-18' THEN
'S-1-5-18 (Local System)'
WHEN events_persisted.sid = 'S-1-5-19' THEN
'S-1-5-19 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-2' THEN
'S-1-5-2 (Network)'
WHEN events_persisted.sid = 'S-1-5-20' THEN
'S-1-5-20 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-21domain-498' THEN
'S-1-5-21domain-498 (Enterprise Read-only Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-521' THEN
'S-1-5-21domain-521 (Read-only Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-571' THEN
'S-1-5-21domain-571 (Allowed RODC Password Replication Group)'
WHEN events_persisted.sid = 'S-1-5-21domain-572' THEN
'S-1-5-21domain-572 (Denied RODC Password Replication Group)'
WHEN events_persisted.sid = 'S-1-5-21domain-500' THEN
'S-1-5-21domain-500 (Administrator)'
WHEN events_persisted.sid = 'S-1-5-21domain-501' THEN
'S-1-5-21domain-501 (Guest)'
WHEN events_persisted.sid = 'S-1-5-21domain-502' THEN
'S-1-5-21domain-502 (KRBTGT)'
WHEN events_persisted.sid = 'S-1-5-21domain-512' THEN
'S-1-5-21domain-512 (Domain Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-513' THEN
'S-1-5-21domain-513 (Domain Users)'
WHEN events_persisted.sid = 'S-1-5-21domain-514' THEN
'S-1-5-21domain-514 (Domain Guests)'
WHEN events_persisted.sid = 'S-1-5-21domain-515' THEN
'S-1-5-21domain-515 (Domain Computers)'
WHEN events_persisted.sid = 'S-1-5-21domain-516' THEN
'S-1-5-21domain-516 (Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-517' THEN
'S-1-5-21domain-517 (Cert Publishers)'
WHEN events_persisted.sid = 'S-1-5-21domain-520' THEN
'S-1-5-21domain-520 (Group Policy Creator Owners)'
WHEN events_persisted.sid = 'S-1-5-21-domain-522' THEN
'S-1-5-21-domain-522 (Cloneable Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-526' THEN
'S-1-5-21domain-526 (Key Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-527' THEN
'S-1-5-21domain-527 (Enterprise Key Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-553' THEN
'S-1-5-21domain-553 (RAS and IAS Servers)'
WHEN events_persisted.sid = 'S-1-5-21root domain-518' THEN
'S-1-5-21root domain-518 (Schema Admins)'
WHEN events_persisted.sid = 'S-1-5-21root domain-519' THEN
'S-1-5-21root domain-519 (Enterprise Admins)'
WHEN events_persisted.sid = 'S-1-5-3' THEN
'S-1-5-3 (Batch)'
WHEN events_persisted.sid = 'S-1-5-32-544' THEN
'S-1-5-32-544 (Administrators)'
WHEN events_persisted.sid = 'S-1-5-32-545' THEN
'S-1-5-32-545 (Users)'
WHEN events_persisted.sid = 'S-1-5-32-546' THEN
'S-1-5-32-546 (Guests)'
WHEN events_persisted.sid = 'S-1-5-32-547' THEN
'S-1-5-32-547 (Power Users)'
WHEN events_persisted.sid = 'S-1-5-32-548' THEN
'S-1-5-32-548 (Account Operators)'
WHEN events_persisted.sid = 'S-1-5-32-549' THEN
'S-1-5-32-549 (Server Operators)'
WHEN events_persisted.sid = 'S-1-5-32-550' THEN
'S-1-5-32-550 (Print Operators)'
WHEN events_persisted.sid = 'S-1-5-32-551' THEN
'S-1-5-32-551 (Backup Operators)'
WHEN events_persisted.sid = 'S-1-5-32-552' THEN
'S-1-5-32-552 (Replicators)'
WHEN events_persisted.sid = 'S-1-5-32-554' THEN
'S-1-5-32-554 (Builtin\\Pre-Windows 2000 Compatible Access)'
WHEN events_persisted.sid = 'S-1-5-32-555' THEN
'S-1-5-32-555 (Builtin\\Remote Desktop Users)'
WHEN events_persisted.sid = 'S-1-5-32-556' THEN
'S-1-5-32-556 (Builtin\\Network Configuration Operators)'
WHEN events_persisted.sid = 'S-1-5-32-557' THEN
'S-1-5-32-557 (Builtin\\Incoming Forest Trust Builders)'
WHEN events_persisted.sid = 'S-1-5-32-558' THEN
'S-1-5-32-558 (Builtin\\Performance Monitor Users)'
WHEN events_persisted.sid = 'S-1-5-32-559' THEN
'S-1-5-32-559 (Builtin\\Performance Log Users)'
WHEN events_persisted.sid = 'S-1-5-32-560' THEN
'S-1-5-32-560 (Builtin\\Windows Authorization Access Group)'
WHEN events_persisted.sid = 'S-1-5-32-561' THEN
'S-1-5-32-561 (Builtin\\Terminal Server License Servers)'
WHEN events_persisted.sid = 'S-1-5-32-562' THEN
'S-1-5-32-562 (Builtin\\Distributed COM Users)'
WHEN events_persisted.sid = 'S-1-5-32-569' THEN
'S-1-5-32-569 (Builtin\\Cryptographic Operators)'
WHEN events_persisted.sid = 'S-1-5-32-573' THEN
'S-1-5-32-573 (Builtin\\Event Log Readers)'
WHEN events_persisted.sid = 'S-1-5-32-574' THEN
'S-1-5-32-574 (Builtin\\Certificate Service DCOM Access)'
WHEN events_persisted.sid = 'S-1-5-32-575' THEN
'S-1-5-32-575 (Builtin\\RDS Remote Access Servers)'
WHEN events_persisted.sid = 'S-1-5-32-576' THEN
'S-1-5-32-576 (Builtin\\RDS Endpoint Servers)'
WHEN events_persisted.sid = 'S-1-5-32-577' THEN
'S-1-5-32-577 (Builtin\\RDS Management Servers)'
WHEN events_persisted.sid = 'S-1-5-32-578' THEN
'S-1-5-32-578 (Builtin\\Hyper-V Administrators)'
WHEN events_persisted.sid = 'S-1-5-32-579' THEN
'S-1-5-32-579 (Builtin\\Access Control Assistance Operators)'
WHEN events_persisted.sid = 'S-1-5-32-580' THEN
'S-1-5-32-580 (Builtin\\Remote Management Users)'
WHEN events_persisted.sid = 'S-1-5-32-582' THEN
'S-1-5-32-582 (Storage Replica Administrators)'
WHEN events_persisted.sid = 'S-1-5-4' THEN
'S-1-5-4 (Interactive)'
WHEN events_persisted.sid = 'S-1-5-5-X-Y' THEN
'S-1-5-5-X-Y (Logon Session)'
WHEN events_persisted.sid = 'S-1-5-6' THEN
'S-1-5-6 (Service)'
WHEN events_persisted.sid = 'S-1-5-64-10' THEN
'S-1-5-64-10 (NTLM Authentication)'
WHEN events_persisted.sid = 'S-1-5-64-14' THEN
'S-1-5-64-14 (SChannelAuthentication)'
WHEN events_persisted.sid = 'S-1-5-64-21' THEN
'S-1-5-64-21 (Digest Authentication)'
WHEN events_persisted.sid = 'S-1-5-7' THEN
'S-1-5-7 (Anonymous)'
WHEN events_persisted.sid = 'S-1-5-8' THEN
'S-1-5-8 (Proxy)'
WHEN events_persisted.sid = 'S-1-5-80' THEN
'S-1-5-80 (NT Service)'
WHEN events_persisted.sid = 'S-1-5-80-0' THEN
'S-1-5-80-0 (NT Services\\All Services)'
WHEN events_persisted.sid = 'S-1-5-80-0' THEN
'S-1-5-80-0 (All Services)'
WHEN events_persisted.sid = 'S-1-5-83-0' THEN
'S-1-5-83-0 (NT Virtual Machine\\Virtual Machines)'
WHEN events_persisted.sid = 'S-1-5-9' THEN
'S-1-5-9 (Enterprise Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-90-0' THEN
'S-1-5-90-0 (Windows Manager\\Windows Manager Group)' ELSE events_persisted.sid
END AS UserSID,
datetime( ( events_persisted.timestamp / 10000000 ) - 11644473600, 'unixepoch' ) AS Timestamp,
tag_descriptions.locale_name AS LocaleName,
producers.producer_id_text AS ProducerIDText,
tag_descriptions.tag_name AS TagName,
events_persisted.full_event_name AS FullEventName,
events_persisted.logging_binary_name AS LoggingBinaryName,
events_persisted.friendly_logging_binary_name AS FriendlyLoggingBinaryName,
events_persisted.full_event_name_hash AS FullEventNameHash,
events_persisted.event_keywords AS Keywords,
provider_groups.group_guid AS GroupGUID,
CASE

WHEN events_persisted.is_core = 0 THEN
'No'
WHEN events_persisted.is_core = 1 THEN
'Yes' ELSE 'Unknown'
END AS IsCore,
events_persisted.compressed_payload_size AS CompressedPayloadSize,
events_persisted.payload AS JSONPayload
FROM
events_persisted
LEFT JOIN producers ON events_persisted.producer_id = producers.producer_id
LEFT JOIN event_tags ON events_persisted.full_event_name_hash = event_tags.full_event_name_hash
LEFT JOIN tag_descriptions ON event_tags.tag_id = tag_descriptions.tag_id
LEFT JOIN provider_groups ON events_persisted.provider_group_id = provider_groups.group_id
WHERE
TagName = 'Browsing History'
ORDER BY
events_persisted.timestamp ASC
`,baseFileName:`EventTranscriptDB_BrowsingHistory_DataSampling`,blobColumns:[]},{name:`Windows EventTranscript.db Device Connectivity and Configuration`,query:`SELECT
CASE

WHEN
events_persisted.sid = 'S-1-0' THEN
'S-1-0 (Null Authority)'
WHEN events_persisted.sid = 'S-1-0-0' THEN
'S-1-0-0 (Nobody)'
WHEN events_persisted.sid = 'S-1-1' THEN
'S-1-1 (World Authority)'
WHEN events_persisted.sid = 'S-1-1-0' THEN
'S-1-1-0 (Everyone)'
WHEN events_persisted.sid = 'S-1-16-0' THEN
'S-1-16-0 (Untrusted Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-12288' THEN
'S-1-16-12288 (High Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-16384' THEN
'S-1-16-16384 (System Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-20480' THEN
'S-1-16-20480 (Protected Process Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-28672' THEN
'S-1-16-28672 (Secure Process Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-4096' THEN
'S-1-16-4096 (Low Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-8192' THEN
'S-1-16-8192 (Medium Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-8448' THEN
'S-1-16-8448 (Medium Plus Mandatory Level)'
WHEN events_persisted.sid = 'S-1-2' THEN
'S-1-2 (Local Authority)'
WHEN events_persisted.sid = 'S-1-2-0' THEN
'S-1-2-0 (Local)'
WHEN events_persisted.sid = 'S-1-2-1' THEN
'S-1-2-1 (Console Logon)'
WHEN events_persisted.sid = 'S-1-3' THEN
'S-1-3 (Creator Authority)'
WHEN events_persisted.sid = 'S-1-3-0' THEN
'S-1-3-0 (Creator Owner)'
WHEN events_persisted.sid = 'S-1-3-1' THEN
'S-1-3-1 (Creator Group)'
WHEN events_persisted.sid = 'S-1-3-2' THEN
'S-1-3-2 (Creator Owner Server)'
WHEN events_persisted.sid = 'S-1-3-3' THEN
'S-1-3-3 (Creator Group Server)'
WHEN events_persisted.sid = 'S-1-3-4' THEN
'S-1-3-4 (Owner Rights)'
WHEN events_persisted.sid = 'S-1-4' THEN
'S-1-4 (Non-unique Authority)'
WHEN events_persisted.sid = 'S-1-5' THEN
'S-1-5 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-1' THEN
'S-1-5-1 (Dialup)'
WHEN events_persisted.sid = 'S-1-5-10' THEN
'S-1-5-10 (Principal Self)'
WHEN events_persisted.sid = 'S-1-5-11' THEN
'S-1-5-11 (Authenticated Users)'
WHEN events_persisted.sid = 'S-1-5-12' THEN
'S-1-5-12 (Restricted Code)'
WHEN events_persisted.sid = 'S-1-5-13' THEN
'S-1-5-13 (Terminal Server Users)'
WHEN events_persisted.sid = 'S-1-5-14' THEN
'S-1-5-14 (Remote Interactive Logon)'
WHEN events_persisted.sid = 'S-1-5-15' THEN
'S-1-5-15 (This Organization)'
WHEN events_persisted.sid = 'S-1-5-17' THEN
'S-1-5-17 (IUSR)'
WHEN events_persisted.sid = 'S-1-5-18' THEN
'S-1-5-18 (Local System)'
WHEN events_persisted.sid = 'S-1-5-19' THEN
'S-1-5-19 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-2' THEN
'S-1-5-2 (Network)'
WHEN events_persisted.sid = 'S-1-5-20' THEN
'S-1-5-20 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-21domain-498' THEN
'S-1-5-21domain-498 (Enterprise Read-only Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-521' THEN
'S-1-5-21domain-521 (Read-only Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-571' THEN
'S-1-5-21domain-571 (Allowed RODC Password Replication Group)'
WHEN events_persisted.sid = 'S-1-5-21domain-572' THEN
'S-1-5-21domain-572 (Denied RODC Password Replication Group)'
WHEN events_persisted.sid = 'S-1-5-21domain-500' THEN
'S-1-5-21domain-500 (Administrator)'
WHEN events_persisted.sid = 'S-1-5-21domain-501' THEN
'S-1-5-21domain-501 (Guest)'
WHEN events_persisted.sid = 'S-1-5-21domain-502' THEN
'S-1-5-21domain-502 (KRBTGT)'
WHEN events_persisted.sid = 'S-1-5-21domain-512' THEN
'S-1-5-21domain-512 (Domain Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-513' THEN
'S-1-5-21domain-513 (Domain Users)'
WHEN events_persisted.sid = 'S-1-5-21domain-514' THEN
'S-1-5-21domain-514 (Domain Guests)'
WHEN events_persisted.sid = 'S-1-5-21domain-515' THEN
'S-1-5-21domain-515 (Domain Computers)'
WHEN events_persisted.sid = 'S-1-5-21domain-516' THEN
'S-1-5-21domain-516 (Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-517' THEN
'S-1-5-21domain-517 (Cert Publishers)'
WHEN events_persisted.sid = 'S-1-5-21domain-520' THEN
'S-1-5-21domain-520 (Group Policy Creator Owners)'
WHEN events_persisted.sid = 'S-1-5-21-domain-522' THEN
'S-1-5-21-domain-522 (Cloneable Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-526' THEN
'S-1-5-21domain-526 (Key Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-527' THEN
'S-1-5-21domain-527 (Enterprise Key Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-553' THEN
'S-1-5-21domain-553 (RAS and IAS Servers)'
WHEN events_persisted.sid = 'S-1-5-21root domain-518' THEN
'S-1-5-21root domain-518 (Schema Admins)'
WHEN events_persisted.sid = 'S-1-5-21root domain-519' THEN
'S-1-5-21root domain-519 (Enterprise Admins)'
WHEN events_persisted.sid = 'S-1-5-3' THEN
'S-1-5-3 (Batch)'
WHEN events_persisted.sid = 'S-1-5-32-544' THEN
'S-1-5-32-544 (Administrators)'
WHEN events_persisted.sid = 'S-1-5-32-545' THEN
'S-1-5-32-545 (Users)'
WHEN events_persisted.sid = 'S-1-5-32-546' THEN
'S-1-5-32-546 (Guests)'
WHEN events_persisted.sid = 'S-1-5-32-547' THEN
'S-1-5-32-547 (Power Users)'
WHEN events_persisted.sid = 'S-1-5-32-548' THEN
'S-1-5-32-548 (Account Operators)'
WHEN events_persisted.sid = 'S-1-5-32-549' THEN
'S-1-5-32-549 (Server Operators)'
WHEN events_persisted.sid = 'S-1-5-32-550' THEN
'S-1-5-32-550 (Print Operators)'
WHEN events_persisted.sid = 'S-1-5-32-551' THEN
'S-1-5-32-551 (Backup Operators)'
WHEN events_persisted.sid = 'S-1-5-32-552' THEN
'S-1-5-32-552 (Replicators)'
WHEN events_persisted.sid = 'S-1-5-32-554' THEN
'S-1-5-32-554 (Builtin\\Pre-Windows 2000 Compatible Access)'
WHEN events_persisted.sid = 'S-1-5-32-555' THEN
'S-1-5-32-555 (Builtin\\Remote Desktop Users)'
WHEN events_persisted.sid = 'S-1-5-32-556' THEN
'S-1-5-32-556 (Builtin\\Network Configuration Operators)'
WHEN events_persisted.sid = 'S-1-5-32-557' THEN
'S-1-5-32-557 (Builtin\\Incoming Forest Trust Builders)'
WHEN events_persisted.sid = 'S-1-5-32-558' THEN
'S-1-5-32-558 (Builtin\\Performance Monitor Users)'
WHEN events_persisted.sid = 'S-1-5-32-559' THEN
'S-1-5-32-559 (Builtin\\Performance Log Users)'
WHEN events_persisted.sid = 'S-1-5-32-560' THEN
'S-1-5-32-560 (Builtin\\Windows Authorization Access Group)'
WHEN events_persisted.sid = 'S-1-5-32-561' THEN
'S-1-5-32-561 (Builtin\\Terminal Server License Servers)'
WHEN events_persisted.sid = 'S-1-5-32-562' THEN
'S-1-5-32-562 (Builtin\\Distributed COM Users)'
WHEN events_persisted.sid = 'S-1-5-32-569' THEN
'S-1-5-32-569 (Builtin\\Cryptographic Operators)'
WHEN events_persisted.sid = 'S-1-5-32-573' THEN
'S-1-5-32-573 (Builtin\\Event Log Readers)'
WHEN events_persisted.sid = 'S-1-5-32-574' THEN
'S-1-5-32-574 (Builtin\\Certificate Service DCOM Access)'
WHEN events_persisted.sid = 'S-1-5-32-575' THEN
'S-1-5-32-575 (Builtin\\RDS Remote Access Servers)'
WHEN events_persisted.sid = 'S-1-5-32-576' THEN
'S-1-5-32-576 (Builtin\\RDS Endpoint Servers)'
WHEN events_persisted.sid = 'S-1-5-32-577' THEN
'S-1-5-32-577 (Builtin\\RDS Management Servers)'
WHEN events_persisted.sid = 'S-1-5-32-578' THEN
'S-1-5-32-578 (Builtin\\Hyper-V Administrators)'
WHEN events_persisted.sid = 'S-1-5-32-579' THEN
'S-1-5-32-579 (Builtin\\Access Control Assistance Operators)'
WHEN events_persisted.sid = 'S-1-5-32-580' THEN
'S-1-5-32-580 (Builtin\\Remote Management Users)'
WHEN events_persisted.sid = 'S-1-5-32-582' THEN
'S-1-5-32-582 (Storage Replica Administrators)'
WHEN events_persisted.sid = 'S-1-5-4' THEN
'S-1-5-4 (Interactive)'
WHEN events_persisted.sid = 'S-1-5-5-X-Y' THEN
'S-1-5-5-X-Y (Logon Session)'
WHEN events_persisted.sid = 'S-1-5-6' THEN
'S-1-5-6 (Service)'
WHEN events_persisted.sid = 'S-1-5-64-10' THEN
'S-1-5-64-10 (NTLM Authentication)'
WHEN events_persisted.sid = 'S-1-5-64-14' THEN
'S-1-5-64-14 (SChannelAuthentication)'
WHEN events_persisted.sid = 'S-1-5-64-21' THEN
'S-1-5-64-21 (Digest Authentication)'
WHEN events_persisted.sid = 'S-1-5-7' THEN
'S-1-5-7 (Anonymous)'
WHEN events_persisted.sid = 'S-1-5-8' THEN
'S-1-5-8 (Proxy)'
WHEN events_persisted.sid = 'S-1-5-80' THEN
'S-1-5-80 (NT Service)'
WHEN events_persisted.sid = 'S-1-5-80-0' THEN
'S-1-5-80-0 (NT Services\\All Services)'
WHEN events_persisted.sid = 'S-1-5-80-0' THEN
'S-1-5-80-0 (All Services)'
WHEN events_persisted.sid = 'S-1-5-83-0' THEN
'S-1-5-83-0 (NT Virtual Machine\\Virtual Machines)'
WHEN events_persisted.sid = 'S-1-5-9' THEN
'S-1-5-9 (Enterprise Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-90-0' THEN
'S-1-5-90-0 (Windows Manager\\Windows Manager Group)' ELSE events_persisted.sid
END AS UserSID,
datetime( ( events_persisted.timestamp / 10000000 ) - 11644473600, 'unixepoch' ) AS Timestamp,
tag_descriptions.locale_name AS LocaleName,
producers.producer_id_text AS ProducerIDText,
tag_descriptions.tag_name AS TagName,
events_persisted.full_event_name AS FullEventName,
events_persisted.logging_binary_name AS LoggingBinaryName,
events_persisted.friendly_logging_binary_name AS FriendlyLoggingBinaryName,
events_persisted.full_event_name_hash AS FullEventNameHash,
events_persisted.event_keywords AS Keywords,
provider_groups.group_guid AS GroupGUID,
CASE

WHEN events_persisted.is_core = 0 THEN
'No'
WHEN events_persisted.is_core = 1 THEN
'Yes' ELSE 'Unknown'
END AS IsCore,
events_persisted.compressed_payload_size AS CompressedPayloadSize,
events_persisted.payload AS JSONPayload
FROM
events_persisted
LEFT JOIN producers ON events_persisted.producer_id = producers.producer_id
LEFT JOIN event_tags ON events_persisted.full_event_name_hash = event_tags.full_event_name_hash
LEFT JOIN tag_descriptions ON event_tags.tag_id = tag_descriptions.tag_id
LEFT JOIN provider_groups ON events_persisted.provider_group_id = provider_groups.group_id
WHERE
TagName = 'Device Connectivity and Configuration'
ORDER BY
events_persisted.timestamp ASC
`,baseFileName:`EventTranscriptDB_DeviceConnectivityandConfiguration_DataSampling`,blobColumns:[]},{name:`Windows EventTranscript.db Inking Typing and Speech Utterance`,query:`SELECT
CASE

WHEN
events_persisted.sid = 'S-1-0' THEN
'S-1-0 (Null Authority)'
WHEN events_persisted.sid = 'S-1-0-0' THEN
'S-1-0-0 (Nobody)'
WHEN events_persisted.sid = 'S-1-1' THEN
'S-1-1 (World Authority)'
WHEN events_persisted.sid = 'S-1-1-0' THEN
'S-1-1-0 (Everyone)'
WHEN events_persisted.sid = 'S-1-16-0' THEN
'S-1-16-0 (Untrusted Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-12288' THEN
'S-1-16-12288 (High Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-16384' THEN
'S-1-16-16384 (System Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-20480' THEN
'S-1-16-20480 (Protected Process Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-28672' THEN
'S-1-16-28672 (Secure Process Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-4096' THEN
'S-1-16-4096 (Low Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-8192' THEN
'S-1-16-8192 (Medium Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-8448' THEN
'S-1-16-8448 (Medium Plus Mandatory Level)'
WHEN events_persisted.sid = 'S-1-2' THEN
'S-1-2 (Local Authority)'
WHEN events_persisted.sid = 'S-1-2-0' THEN
'S-1-2-0 (Local)'
WHEN events_persisted.sid = 'S-1-2-1' THEN
'S-1-2-1 (Console Logon)'
WHEN events_persisted.sid = 'S-1-3' THEN
'S-1-3 (Creator Authority)'
WHEN events_persisted.sid = 'S-1-3-0' THEN
'S-1-3-0 (Creator Owner)'
WHEN events_persisted.sid = 'S-1-3-1' THEN
'S-1-3-1 (Creator Group)'
WHEN events_persisted.sid = 'S-1-3-2' THEN
'S-1-3-2 (Creator Owner Server)'
WHEN events_persisted.sid = 'S-1-3-3' THEN
'S-1-3-3 (Creator Group Server)'
WHEN events_persisted.sid = 'S-1-3-4' THEN
'S-1-3-4 (Owner Rights)'
WHEN events_persisted.sid = 'S-1-4' THEN
'S-1-4 (Non-unique Authority)'
WHEN events_persisted.sid = 'S-1-5' THEN
'S-1-5 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-1' THEN
'S-1-5-1 (Dialup)'
WHEN events_persisted.sid = 'S-1-5-10' THEN
'S-1-5-10 (Principal Self)'
WHEN events_persisted.sid = 'S-1-5-11' THEN
'S-1-5-11 (Authenticated Users)'
WHEN events_persisted.sid = 'S-1-5-12' THEN
'S-1-5-12 (Restricted Code)'
WHEN events_persisted.sid = 'S-1-5-13' THEN
'S-1-5-13 (Terminal Server Users)'
WHEN events_persisted.sid = 'S-1-5-14' THEN
'S-1-5-14 (Remote Interactive Logon)'
WHEN events_persisted.sid = 'S-1-5-15' THEN
'S-1-5-15 (This Organization)'
WHEN events_persisted.sid = 'S-1-5-17' THEN
'S-1-5-17 (IUSR)'
WHEN events_persisted.sid = 'S-1-5-18' THEN
'S-1-5-18 (Local System)'
WHEN events_persisted.sid = 'S-1-5-19' THEN
'S-1-5-19 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-2' THEN
'S-1-5-2 (Network)'
WHEN events_persisted.sid = 'S-1-5-20' THEN
'S-1-5-20 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-21domain-498' THEN
'S-1-5-21domain-498 (Enterprise Read-only Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-521' THEN
'S-1-5-21domain-521 (Read-only Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-571' THEN
'S-1-5-21domain-571 (Allowed RODC Password Replication Group)'
WHEN events_persisted.sid = 'S-1-5-21domain-572' THEN
'S-1-5-21domain-572 (Denied RODC Password Replication Group)'
WHEN events_persisted.sid = 'S-1-5-21domain-500' THEN
'S-1-5-21domain-500 (Administrator)'
WHEN events_persisted.sid = 'S-1-5-21domain-501' THEN
'S-1-5-21domain-501 (Guest)'
WHEN events_persisted.sid = 'S-1-5-21domain-502' THEN
'S-1-5-21domain-502 (KRBTGT)'
WHEN events_persisted.sid = 'S-1-5-21domain-512' THEN
'S-1-5-21domain-512 (Domain Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-513' THEN
'S-1-5-21domain-513 (Domain Users)'
WHEN events_persisted.sid = 'S-1-5-21domain-514' THEN
'S-1-5-21domain-514 (Domain Guests)'
WHEN events_persisted.sid = 'S-1-5-21domain-515' THEN
'S-1-5-21domain-515 (Domain Computers)'
WHEN events_persisted.sid = 'S-1-5-21domain-516' THEN
'S-1-5-21domain-516 (Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-517' THEN
'S-1-5-21domain-517 (Cert Publishers)'
WHEN events_persisted.sid = 'S-1-5-21domain-520' THEN
'S-1-5-21domain-520 (Group Policy Creator Owners)'
WHEN events_persisted.sid = 'S-1-5-21-domain-522' THEN
'S-1-5-21-domain-522 (Cloneable Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-526' THEN
'S-1-5-21domain-526 (Key Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-527' THEN
'S-1-5-21domain-527 (Enterprise Key Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-553' THEN
'S-1-5-21domain-553 (RAS and IAS Servers)'
WHEN events_persisted.sid = 'S-1-5-21root domain-518' THEN
'S-1-5-21root domain-518 (Schema Admins)'
WHEN events_persisted.sid = 'S-1-5-21root domain-519' THEN
'S-1-5-21root domain-519 (Enterprise Admins)'
WHEN events_persisted.sid = 'S-1-5-3' THEN
'S-1-5-3 (Batch)'
WHEN events_persisted.sid = 'S-1-5-32-544' THEN
'S-1-5-32-544 (Administrators)'
WHEN events_persisted.sid = 'S-1-5-32-545' THEN
'S-1-5-32-545 (Users)'
WHEN events_persisted.sid = 'S-1-5-32-546' THEN
'S-1-5-32-546 (Guests)'
WHEN events_persisted.sid = 'S-1-5-32-547' THEN
'S-1-5-32-547 (Power Users)'
WHEN events_persisted.sid = 'S-1-5-32-548' THEN
'S-1-5-32-548 (Account Operators)'
WHEN events_persisted.sid = 'S-1-5-32-549' THEN
'S-1-5-32-549 (Server Operators)'
WHEN events_persisted.sid = 'S-1-5-32-550' THEN
'S-1-5-32-550 (Print Operators)'
WHEN events_persisted.sid = 'S-1-5-32-551' THEN
'S-1-5-32-551 (Backup Operators)'
WHEN events_persisted.sid = 'S-1-5-32-552' THEN
'S-1-5-32-552 (Replicators)'
WHEN events_persisted.sid = 'S-1-5-32-554' THEN
'S-1-5-32-554 (Builtin\\Pre-Windows 2000 Compatible Access)'
WHEN events_persisted.sid = 'S-1-5-32-555' THEN
'S-1-5-32-555 (Builtin\\Remote Desktop Users)'
WHEN events_persisted.sid = 'S-1-5-32-556' THEN
'S-1-5-32-556 (Builtin\\Network Configuration Operators)'
WHEN events_persisted.sid = 'S-1-5-32-557' THEN
'S-1-5-32-557 (Builtin\\Incoming Forest Trust Builders)'
WHEN events_persisted.sid = 'S-1-5-32-558' THEN
'S-1-5-32-558 (Builtin\\Performance Monitor Users)'
WHEN events_persisted.sid = 'S-1-5-32-559' THEN
'S-1-5-32-559 (Builtin\\Performance Log Users)'
WHEN events_persisted.sid = 'S-1-5-32-560' THEN
'S-1-5-32-560 (Builtin\\Windows Authorization Access Group)'
WHEN events_persisted.sid = 'S-1-5-32-561' THEN
'S-1-5-32-561 (Builtin\\Terminal Server License Servers)'
WHEN events_persisted.sid = 'S-1-5-32-562' THEN
'S-1-5-32-562 (Builtin\\Distributed COM Users)'
WHEN events_persisted.sid = 'S-1-5-32-569' THEN
'S-1-5-32-569 (Builtin\\Cryptographic Operators)'
WHEN events_persisted.sid = 'S-1-5-32-573' THEN
'S-1-5-32-573 (Builtin\\Event Log Readers)'
WHEN events_persisted.sid = 'S-1-5-32-574' THEN
'S-1-5-32-574 (Builtin\\Certificate Service DCOM Access)'
WHEN events_persisted.sid = 'S-1-5-32-575' THEN
'S-1-5-32-575 (Builtin\\RDS Remote Access Servers)'
WHEN events_persisted.sid = 'S-1-5-32-576' THEN
'S-1-5-32-576 (Builtin\\RDS Endpoint Servers)'
WHEN events_persisted.sid = 'S-1-5-32-577' THEN
'S-1-5-32-577 (Builtin\\RDS Management Servers)'
WHEN events_persisted.sid = 'S-1-5-32-578' THEN
'S-1-5-32-578 (Builtin\\Hyper-V Administrators)'
WHEN events_persisted.sid = 'S-1-5-32-579' THEN
'S-1-5-32-579 (Builtin\\Access Control Assistance Operators)'
WHEN events_persisted.sid = 'S-1-5-32-580' THEN
'S-1-5-32-580 (Builtin\\Remote Management Users)'
WHEN events_persisted.sid = 'S-1-5-32-582' THEN
'S-1-5-32-582 (Storage Replica Administrators)'
WHEN events_persisted.sid = 'S-1-5-4' THEN
'S-1-5-4 (Interactive)'
WHEN events_persisted.sid = 'S-1-5-5-X-Y' THEN
'S-1-5-5-X-Y (Logon Session)'
WHEN events_persisted.sid = 'S-1-5-6' THEN
'S-1-5-6 (Service)'
WHEN events_persisted.sid = 'S-1-5-64-10' THEN
'S-1-5-64-10 (NTLM Authentication)'
WHEN events_persisted.sid = 'S-1-5-64-14' THEN
'S-1-5-64-14 (SChannelAuthentication)'
WHEN events_persisted.sid = 'S-1-5-64-21' THEN
'S-1-5-64-21 (Digest Authentication)'
WHEN events_persisted.sid = 'S-1-5-7' THEN
'S-1-5-7 (Anonymous)'
WHEN events_persisted.sid = 'S-1-5-8' THEN
'S-1-5-8 (Proxy)'
WHEN events_persisted.sid = 'S-1-5-80' THEN
'S-1-5-80 (NT Service)'
WHEN events_persisted.sid = 'S-1-5-80-0' THEN
'S-1-5-80-0 (NT Services\\All Services)'
WHEN events_persisted.sid = 'S-1-5-80-0' THEN
'S-1-5-80-0 (All Services)'
WHEN events_persisted.sid = 'S-1-5-83-0' THEN
'S-1-5-83-0 (NT Virtual Machine\\Virtual Machines)'
WHEN events_persisted.sid = 'S-1-5-9' THEN
'S-1-5-9 (Enterprise Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-90-0' THEN
'S-1-5-90-0 (Windows Manager\\Windows Manager Group)' ELSE events_persisted.sid
END AS UserSID,
datetime( ( events_persisted.timestamp / 10000000 ) - 11644473600, 'unixepoch' ) AS Timestamp,
tag_descriptions.locale_name AS LocaleName,
producers.producer_id_text AS ProducerIDText,
tag_descriptions.tag_name AS TagName,
events_persisted.full_event_name AS FullEventName,
events_persisted.logging_binary_name AS LoggingBinaryName,
events_persisted.friendly_logging_binary_name AS FriendlyLoggingBinaryName,
events_persisted.full_event_name_hash AS FullEventNameHash,
events_persisted.event_keywords AS Keywords,
provider_groups.group_guid AS GroupGUID,
CASE

WHEN events_persisted.is_core = 0 THEN
'No'
WHEN events_persisted.is_core = 1 THEN
'Yes' ELSE 'Unknown'
END AS IsCore,
events_persisted.compressed_payload_size AS CompressedPayloadSize,
events_persisted.payload AS JSONPayload
FROM
events_persisted
LEFT JOIN producers ON events_persisted.producer_id = producers.producer_id
LEFT JOIN event_tags ON events_persisted.full_event_name_hash = event_tags.full_event_name_hash
LEFT JOIN tag_descriptions ON event_tags.tag_id = tag_descriptions.tag_id
LEFT JOIN provider_groups ON events_persisted.provider_group_id = provider_groups.group_id
WHERE
TagName = 'Inking Typing and Speech Utterance'
ORDER BY
events_persisted.timestamp ASC
`,baseFileName:`EventTranscriptDB_InkingTypingandSpeechUtterance_DataSampling`,blobColumns:[]},{name:`Windows EventTranscript.db_ProductandServicePerformance`,query:`SELECT
CASE

WHEN
events_persisted.sid = 'S-1-0' THEN
'S-1-0 (Null Authority)'
WHEN events_persisted.sid = 'S-1-0-0' THEN
'S-1-0-0 (Nobody)'
WHEN events_persisted.sid = 'S-1-1' THEN
'S-1-1 (World Authority)'
WHEN events_persisted.sid = 'S-1-1-0' THEN
'S-1-1-0 (Everyone)'
WHEN events_persisted.sid = 'S-1-16-0' THEN
'S-1-16-0 (Untrusted Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-12288' THEN
'S-1-16-12288 (High Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-16384' THEN
'S-1-16-16384 (System Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-20480' THEN
'S-1-16-20480 (Protected Process Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-28672' THEN
'S-1-16-28672 (Secure Process Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-4096' THEN
'S-1-16-4096 (Low Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-8192' THEN
'S-1-16-8192 (Medium Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-8448' THEN
'S-1-16-8448 (Medium Plus Mandatory Level)'
WHEN events_persisted.sid = 'S-1-2' THEN
'S-1-2 (Local Authority)'
WHEN events_persisted.sid = 'S-1-2-0' THEN
'S-1-2-0 (Local)'
WHEN events_persisted.sid = 'S-1-2-1' THEN
'S-1-2-1 (Console Logon)'
WHEN events_persisted.sid = 'S-1-3' THEN
'S-1-3 (Creator Authority)'
WHEN events_persisted.sid = 'S-1-3-0' THEN
'S-1-3-0 (Creator Owner)'
WHEN events_persisted.sid = 'S-1-3-1' THEN
'S-1-3-1 (Creator Group)'
WHEN events_persisted.sid = 'S-1-3-2' THEN
'S-1-3-2 (Creator Owner Server)'
WHEN events_persisted.sid = 'S-1-3-3' THEN
'S-1-3-3 (Creator Group Server)'
WHEN events_persisted.sid = 'S-1-3-4' THEN
'S-1-3-4 (Owner Rights)'
WHEN events_persisted.sid = 'S-1-4' THEN
'S-1-4 (Non-unique Authority)'
WHEN events_persisted.sid = 'S-1-5' THEN
'S-1-5 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-1' THEN
'S-1-5-1 (Dialup)'
WHEN events_persisted.sid = 'S-1-5-10' THEN
'S-1-5-10 (Principal Self)'
WHEN events_persisted.sid = 'S-1-5-11' THEN
'S-1-5-11 (Authenticated Users)'
WHEN events_persisted.sid = 'S-1-5-12' THEN
'S-1-5-12 (Restricted Code)'
WHEN events_persisted.sid = 'S-1-5-13' THEN
'S-1-5-13 (Terminal Server Users)'
WHEN events_persisted.sid = 'S-1-5-14' THEN
'S-1-5-14 (Remote Interactive Logon)'
WHEN events_persisted.sid = 'S-1-5-15' THEN
'S-1-5-15 (This Organization)'
WHEN events_persisted.sid = 'S-1-5-17' THEN
'S-1-5-17 (IUSR)'
WHEN events_persisted.sid = 'S-1-5-18' THEN
'S-1-5-18 (Local System)'
WHEN events_persisted.sid = 'S-1-5-19' THEN
'S-1-5-19 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-2' THEN
'S-1-5-2 (Network)'
WHEN events_persisted.sid = 'S-1-5-20' THEN
'S-1-5-20 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-21domain-498' THEN
'S-1-5-21domain-498 (Enterprise Read-only Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-521' THEN
'S-1-5-21domain-521 (Read-only Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-571' THEN
'S-1-5-21domain-571 (Allowed RODC Password Replication Group)'
WHEN events_persisted.sid = 'S-1-5-21domain-572' THEN
'S-1-5-21domain-572 (Denied RODC Password Replication Group)'
WHEN events_persisted.sid = 'S-1-5-21domain-500' THEN
'S-1-5-21domain-500 (Administrator)'
WHEN events_persisted.sid = 'S-1-5-21domain-501' THEN
'S-1-5-21domain-501 (Guest)'
WHEN events_persisted.sid = 'S-1-5-21domain-502' THEN
'S-1-5-21domain-502 (KRBTGT)'
WHEN events_persisted.sid = 'S-1-5-21domain-512' THEN
'S-1-5-21domain-512 (Domain Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-513' THEN
'S-1-5-21domain-513 (Domain Users)'
WHEN events_persisted.sid = 'S-1-5-21domain-514' THEN
'S-1-5-21domain-514 (Domain Guests)'
WHEN events_persisted.sid = 'S-1-5-21domain-515' THEN
'S-1-5-21domain-515 (Domain Computers)'
WHEN events_persisted.sid = 'S-1-5-21domain-516' THEN
'S-1-5-21domain-516 (Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-517' THEN
'S-1-5-21domain-517 (Cert Publishers)'
WHEN events_persisted.sid = 'S-1-5-21domain-520' THEN
'S-1-5-21domain-520 (Group Policy Creator Owners)'
WHEN events_persisted.sid = 'S-1-5-21-domain-522' THEN
'S-1-5-21-domain-522 (Cloneable Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-526' THEN
'S-1-5-21domain-526 (Key Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-527' THEN
'S-1-5-21domain-527 (Enterprise Key Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-553' THEN
'S-1-5-21domain-553 (RAS and IAS Servers)'
WHEN events_persisted.sid = 'S-1-5-21root domain-518' THEN
'S-1-5-21root domain-518 (Schema Admins)'
WHEN events_persisted.sid = 'S-1-5-21root domain-519' THEN
'S-1-5-21root domain-519 (Enterprise Admins)'
WHEN events_persisted.sid = 'S-1-5-3' THEN
'S-1-5-3 (Batch)'
WHEN events_persisted.sid = 'S-1-5-32-544' THEN
'S-1-5-32-544 (Administrators)'
WHEN events_persisted.sid = 'S-1-5-32-545' THEN
'S-1-5-32-545 (Users)'
WHEN events_persisted.sid = 'S-1-5-32-546' THEN
'S-1-5-32-546 (Guests)'
WHEN events_persisted.sid = 'S-1-5-32-547' THEN
'S-1-5-32-547 (Power Users)'
WHEN events_persisted.sid = 'S-1-5-32-548' THEN
'S-1-5-32-548 (Account Operators)'
WHEN events_persisted.sid = 'S-1-5-32-549' THEN
'S-1-5-32-549 (Server Operators)'
WHEN events_persisted.sid = 'S-1-5-32-550' THEN
'S-1-5-32-550 (Print Operators)'
WHEN events_persisted.sid = 'S-1-5-32-551' THEN
'S-1-5-32-551 (Backup Operators)'
WHEN events_persisted.sid = 'S-1-5-32-552' THEN
'S-1-5-32-552 (Replicators)'
WHEN events_persisted.sid = 'S-1-5-32-554' THEN
'S-1-5-32-554 (Builtin\\Pre-Windows 2000 Compatible Access)'
WHEN events_persisted.sid = 'S-1-5-32-555' THEN
'S-1-5-32-555 (Builtin\\Remote Desktop Users)'
WHEN events_persisted.sid = 'S-1-5-32-556' THEN
'S-1-5-32-556 (Builtin\\Network Configuration Operators)'
WHEN events_persisted.sid = 'S-1-5-32-557' THEN
'S-1-5-32-557 (Builtin\\Incoming Forest Trust Builders)'
WHEN events_persisted.sid = 'S-1-5-32-558' THEN
'S-1-5-32-558 (Builtin\\Performance Monitor Users)'
WHEN events_persisted.sid = 'S-1-5-32-559' THEN
'S-1-5-32-559 (Builtin\\Performance Log Users)'
WHEN events_persisted.sid = 'S-1-5-32-560' THEN
'S-1-5-32-560 (Builtin\\Windows Authorization Access Group)'
WHEN events_persisted.sid = 'S-1-5-32-561' THEN
'S-1-5-32-561 (Builtin\\Terminal Server License Servers)'
WHEN events_persisted.sid = 'S-1-5-32-562' THEN
'S-1-5-32-562 (Builtin\\Distributed COM Users)'
WHEN events_persisted.sid = 'S-1-5-32-569' THEN
'S-1-5-32-569 (Builtin\\Cryptographic Operators)'
WHEN events_persisted.sid = 'S-1-5-32-573' THEN
'S-1-5-32-573 (Builtin\\Event Log Readers)'
WHEN events_persisted.sid = 'S-1-5-32-574' THEN
'S-1-5-32-574 (Builtin\\Certificate Service DCOM Access)'
WHEN events_persisted.sid = 'S-1-5-32-575' THEN
'S-1-5-32-575 (Builtin\\RDS Remote Access Servers)'
WHEN events_persisted.sid = 'S-1-5-32-576' THEN
'S-1-5-32-576 (Builtin\\RDS Endpoint Servers)'
WHEN events_persisted.sid = 'S-1-5-32-577' THEN
'S-1-5-32-577 (Builtin\\RDS Management Servers)'
WHEN events_persisted.sid = 'S-1-5-32-578' THEN
'S-1-5-32-578 (Builtin\\Hyper-V Administrators)'
WHEN events_persisted.sid = 'S-1-5-32-579' THEN
'S-1-5-32-579 (Builtin\\Access Control Assistance Operators)'
WHEN events_persisted.sid = 'S-1-5-32-580' THEN
'S-1-5-32-580 (Builtin\\Remote Management Users)'
WHEN events_persisted.sid = 'S-1-5-32-582' THEN
'S-1-5-32-582 (Storage Replica Administrators)'
WHEN events_persisted.sid = 'S-1-5-4' THEN
'S-1-5-4 (Interactive)'
WHEN events_persisted.sid = 'S-1-5-5-X-Y' THEN
'S-1-5-5-X-Y (Logon Session)'
WHEN events_persisted.sid = 'S-1-5-6' THEN
'S-1-5-6 (Service)'
WHEN events_persisted.sid = 'S-1-5-64-10' THEN
'S-1-5-64-10 (NTLM Authentication)'
WHEN events_persisted.sid = 'S-1-5-64-14' THEN
'S-1-5-64-14 (SChannelAuthentication)'
WHEN events_persisted.sid = 'S-1-5-64-21' THEN
'S-1-5-64-21 (Digest Authentication)'
WHEN events_persisted.sid = 'S-1-5-7' THEN
'S-1-5-7 (Anonymous)'
WHEN events_persisted.sid = 'S-1-5-8' THEN
'S-1-5-8 (Proxy)'
WHEN events_persisted.sid = 'S-1-5-80' THEN
'S-1-5-80 (NT Service)'
WHEN events_persisted.sid = 'S-1-5-80-0' THEN
'S-1-5-80-0 (NT Services\\All Services)'
WHEN events_persisted.sid = 'S-1-5-80-0' THEN
'S-1-5-80-0 (All Services)'
WHEN events_persisted.sid = 'S-1-5-83-0' THEN
'S-1-5-83-0 (NT Virtual Machine\\Virtual Machines)'
WHEN events_persisted.sid = 'S-1-5-9' THEN
'S-1-5-9 (Enterprise Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-90-0' THEN
'S-1-5-90-0 (Windows Manager\\Windows Manager Group)' ELSE events_persisted.sid
END AS UserSID,
datetime( ( events_persisted.timestamp / 10000000 ) - 11644473600, 'unixepoch' ) AS Timestamp,
tag_descriptions.locale_name AS LocaleName,
producers.producer_id_text AS ProducerIDText,
tag_descriptions.tag_name AS TagName,
events_persisted.full_event_name AS FullEventName,
events_persisted.logging_binary_name AS LoggingBinaryName,
events_persisted.friendly_logging_binary_name AS FriendlyLoggingBinaryName,
events_persisted.full_event_name_hash AS FullEventNameHash,
events_persisted.event_keywords AS Keywords,
provider_groups.group_guid AS GroupGUID,
CASE

WHEN events_persisted.is_core = 0 THEN
'No'
WHEN events_persisted.is_core = 1 THEN
'Yes' ELSE 'Unknown'
END AS IsCore,
events_persisted.compressed_payload_size AS CompressedPayloadSize,
events_persisted.payload AS JSONPayload
FROM
events_persisted
LEFT JOIN producers ON events_persisted.producer_id = producers.producer_id
LEFT JOIN event_tags ON events_persisted.full_event_name_hash = event_tags.full_event_name_hash
LEFT JOIN tag_descriptions ON event_tags.tag_id = tag_descriptions.tag_id
LEFT JOIN provider_groups ON events_persisted.provider_group_id = provider_groups.group_id
WHERE
TagName = 'Product and Service Performance'
ORDER BY
events_persisted.timestamp ASC
`,baseFileName:`EventTranscriptDB_ProductandServicePerformance_DataSampling`,blobColumns:[]},{name:`Windows EventTranscript.db Product and Service Usage`,query:`SELECT
CASE

WHEN
events_persisted.sid = 'S-1-0' THEN
'S-1-0 (Null Authority)'
WHEN events_persisted.sid = 'S-1-0-0' THEN
'S-1-0-0 (Nobody)'
WHEN events_persisted.sid = 'S-1-1' THEN
'S-1-1 (World Authority)'
WHEN events_persisted.sid = 'S-1-1-0' THEN
'S-1-1-0 (Everyone)'
WHEN events_persisted.sid = 'S-1-16-0' THEN
'S-1-16-0 (Untrusted Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-12288' THEN
'S-1-16-12288 (High Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-16384' THEN
'S-1-16-16384 (System Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-20480' THEN
'S-1-16-20480 (Protected Process Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-28672' THEN
'S-1-16-28672 (Secure Process Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-4096' THEN
'S-1-16-4096 (Low Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-8192' THEN
'S-1-16-8192 (Medium Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-8448' THEN
'S-1-16-8448 (Medium Plus Mandatory Level)'
WHEN events_persisted.sid = 'S-1-2' THEN
'S-1-2 (Local Authority)'
WHEN events_persisted.sid = 'S-1-2-0' THEN
'S-1-2-0 (Local)'
WHEN events_persisted.sid = 'S-1-2-1' THEN
'S-1-2-1 (Console Logon)'
WHEN events_persisted.sid = 'S-1-3' THEN
'S-1-3 (Creator Authority)'
WHEN events_persisted.sid = 'S-1-3-0' THEN
'S-1-3-0 (Creator Owner)'
WHEN events_persisted.sid = 'S-1-3-1' THEN
'S-1-3-1 (Creator Group)'
WHEN events_persisted.sid = 'S-1-3-2' THEN
'S-1-3-2 (Creator Owner Server)'
WHEN events_persisted.sid = 'S-1-3-3' THEN
'S-1-3-3 (Creator Group Server)'
WHEN events_persisted.sid = 'S-1-3-4' THEN
'S-1-3-4 (Owner Rights)'
WHEN events_persisted.sid = 'S-1-4' THEN
'S-1-4 (Non-unique Authority)'
WHEN events_persisted.sid = 'S-1-5' THEN
'S-1-5 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-1' THEN
'S-1-5-1 (Dialup)'
WHEN events_persisted.sid = 'S-1-5-10' THEN
'S-1-5-10 (Principal Self)'
WHEN events_persisted.sid = 'S-1-5-11' THEN
'S-1-5-11 (Authenticated Users)'
WHEN events_persisted.sid = 'S-1-5-12' THEN
'S-1-5-12 (Restricted Code)'
WHEN events_persisted.sid = 'S-1-5-13' THEN
'S-1-5-13 (Terminal Server Users)'
WHEN events_persisted.sid = 'S-1-5-14' THEN
'S-1-5-14 (Remote Interactive Logon)'
WHEN events_persisted.sid = 'S-1-5-15' THEN
'S-1-5-15 (This Organization)'
WHEN events_persisted.sid = 'S-1-5-17' THEN
'S-1-5-17 (IUSR)'
WHEN events_persisted.sid = 'S-1-5-18' THEN
'S-1-5-18 (Local System)'
WHEN events_persisted.sid = 'S-1-5-19' THEN
'S-1-5-19 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-2' THEN
'S-1-5-2 (Network)'
WHEN events_persisted.sid = 'S-1-5-20' THEN
'S-1-5-20 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-21domain-498' THEN
'S-1-5-21domain-498 (Enterprise Read-only Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-521' THEN
'S-1-5-21domain-521 (Read-only Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-571' THEN
'S-1-5-21domain-571 (Allowed RODC Password Replication Group)'
WHEN events_persisted.sid = 'S-1-5-21domain-572' THEN
'S-1-5-21domain-572 (Denied RODC Password Replication Group)'
WHEN events_persisted.sid = 'S-1-5-21domain-500' THEN
'S-1-5-21domain-500 (Administrator)'
WHEN events_persisted.sid = 'S-1-5-21domain-501' THEN
'S-1-5-21domain-501 (Guest)'
WHEN events_persisted.sid = 'S-1-5-21domain-502' THEN
'S-1-5-21domain-502 (KRBTGT)'
WHEN events_persisted.sid = 'S-1-5-21domain-512' THEN
'S-1-5-21domain-512 (Domain Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-513' THEN
'S-1-5-21domain-513 (Domain Users)'
WHEN events_persisted.sid = 'S-1-5-21domain-514' THEN
'S-1-5-21domain-514 (Domain Guests)'
WHEN events_persisted.sid = 'S-1-5-21domain-515' THEN
'S-1-5-21domain-515 (Domain Computers)'
WHEN events_persisted.sid = 'S-1-5-21domain-516' THEN
'S-1-5-21domain-516 (Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-517' THEN
'S-1-5-21domain-517 (Cert Publishers)'
WHEN events_persisted.sid = 'S-1-5-21domain-520' THEN
'S-1-5-21domain-520 (Group Policy Creator Owners)'
WHEN events_persisted.sid = 'S-1-5-21-domain-522' THEN
'S-1-5-21-domain-522 (Cloneable Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-526' THEN
'S-1-5-21domain-526 (Key Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-527' THEN
'S-1-5-21domain-527 (Enterprise Key Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-553' THEN
'S-1-5-21domain-553 (RAS and IAS Servers)'
WHEN events_persisted.sid = 'S-1-5-21root domain-518' THEN
'S-1-5-21root domain-518 (Schema Admins)'
WHEN events_persisted.sid = 'S-1-5-21root domain-519' THEN
'S-1-5-21root domain-519 (Enterprise Admins)'
WHEN events_persisted.sid = 'S-1-5-3' THEN
'S-1-5-3 (Batch)'
WHEN events_persisted.sid = 'S-1-5-32-544' THEN
'S-1-5-32-544 (Administrators)'
WHEN events_persisted.sid = 'S-1-5-32-545' THEN
'S-1-5-32-545 (Users)'
WHEN events_persisted.sid = 'S-1-5-32-546' THEN
'S-1-5-32-546 (Guests)'
WHEN events_persisted.sid = 'S-1-5-32-547' THEN
'S-1-5-32-547 (Power Users)'
WHEN events_persisted.sid = 'S-1-5-32-548' THEN
'S-1-5-32-548 (Account Operators)'
WHEN events_persisted.sid = 'S-1-5-32-549' THEN
'S-1-5-32-549 (Server Operators)'
WHEN events_persisted.sid = 'S-1-5-32-550' THEN
'S-1-5-32-550 (Print Operators)'
WHEN events_persisted.sid = 'S-1-5-32-551' THEN
'S-1-5-32-551 (Backup Operators)'
WHEN events_persisted.sid = 'S-1-5-32-552' THEN
'S-1-5-32-552 (Replicators)'
WHEN events_persisted.sid = 'S-1-5-32-554' THEN
'S-1-5-32-554 (Builtin\\Pre-Windows 2000 Compatible Access)'
WHEN events_persisted.sid = 'S-1-5-32-555' THEN
'S-1-5-32-555 (Builtin\\Remote Desktop Users)'
WHEN events_persisted.sid = 'S-1-5-32-556' THEN
'S-1-5-32-556 (Builtin\\Network Configuration Operators)'
WHEN events_persisted.sid = 'S-1-5-32-557' THEN
'S-1-5-32-557 (Builtin\\Incoming Forest Trust Builders)'
WHEN events_persisted.sid = 'S-1-5-32-558' THEN
'S-1-5-32-558 (Builtin\\Performance Monitor Users)'
WHEN events_persisted.sid = 'S-1-5-32-559' THEN
'S-1-5-32-559 (Builtin\\Performance Log Users)'
WHEN events_persisted.sid = 'S-1-5-32-560' THEN
'S-1-5-32-560 (Builtin\\Windows Authorization Access Group)'
WHEN events_persisted.sid = 'S-1-5-32-561' THEN
'S-1-5-32-561 (Builtin\\Terminal Server License Servers)'
WHEN events_persisted.sid = 'S-1-5-32-562' THEN
'S-1-5-32-562 (Builtin\\Distributed COM Users)'
WHEN events_persisted.sid = 'S-1-5-32-569' THEN
'S-1-5-32-569 (Builtin\\Cryptographic Operators)'
WHEN events_persisted.sid = 'S-1-5-32-573' THEN
'S-1-5-32-573 (Builtin\\Event Log Readers)'
WHEN events_persisted.sid = 'S-1-5-32-574' THEN
'S-1-5-32-574 (Builtin\\Certificate Service DCOM Access)'
WHEN events_persisted.sid = 'S-1-5-32-575' THEN
'S-1-5-32-575 (Builtin\\RDS Remote Access Servers)'
WHEN events_persisted.sid = 'S-1-5-32-576' THEN
'S-1-5-32-576 (Builtin\\RDS Endpoint Servers)'
WHEN events_persisted.sid = 'S-1-5-32-577' THEN
'S-1-5-32-577 (Builtin\\RDS Management Servers)'
WHEN events_persisted.sid = 'S-1-5-32-578' THEN
'S-1-5-32-578 (Builtin\\Hyper-V Administrators)'
WHEN events_persisted.sid = 'S-1-5-32-579' THEN
'S-1-5-32-579 (Builtin\\Access Control Assistance Operators)'
WHEN events_persisted.sid = 'S-1-5-32-580' THEN
'S-1-5-32-580 (Builtin\\Remote Management Users)'
WHEN events_persisted.sid = 'S-1-5-32-582' THEN
'S-1-5-32-582 (Storage Replica Administrators)'
WHEN events_persisted.sid = 'S-1-5-4' THEN
'S-1-5-4 (Interactive)'
WHEN events_persisted.sid = 'S-1-5-5-X-Y' THEN
'S-1-5-5-X-Y (Logon Session)'
WHEN events_persisted.sid = 'S-1-5-6' THEN
'S-1-5-6 (Service)'
WHEN events_persisted.sid = 'S-1-5-64-10' THEN
'S-1-5-64-10 (NTLM Authentication)'
WHEN events_persisted.sid = 'S-1-5-64-14' THEN
'S-1-5-64-14 (SChannelAuthentication)'
WHEN events_persisted.sid = 'S-1-5-64-21' THEN
'S-1-5-64-21 (Digest Authentication)'
WHEN events_persisted.sid = 'S-1-5-7' THEN
'S-1-5-7 (Anonymous)'
WHEN events_persisted.sid = 'S-1-5-8' THEN
'S-1-5-8 (Proxy)'
WHEN events_persisted.sid = 'S-1-5-80' THEN
'S-1-5-80 (NT Service)'
WHEN events_persisted.sid = 'S-1-5-80-0' THEN
'S-1-5-80-0 (NT Services\\All Services)'
WHEN events_persisted.sid = 'S-1-5-80-0' THEN
'S-1-5-80-0 (All Services)'
WHEN events_persisted.sid = 'S-1-5-83-0' THEN
'S-1-5-83-0 (NT Virtual Machine\\Virtual Machines)'
WHEN events_persisted.sid = 'S-1-5-9' THEN
'S-1-5-9 (Enterprise Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-90-0' THEN
'S-1-5-90-0 (Windows Manager\\Windows Manager Group)' ELSE events_persisted.sid
END AS UserSID,
datetime( ( events_persisted.timestamp / 10000000 ) - 11644473600, 'unixepoch' ) AS Timestamp,
tag_descriptions.locale_name AS LocaleName,
producers.producer_id_text AS ProducerIDText,
tag_descriptions.tag_name AS TagName,
events_persisted.full_event_name AS FullEventName,
events_persisted.logging_binary_name AS LoggingBinaryName,
events_persisted.friendly_logging_binary_name AS FriendlyLoggingBinaryName,
events_persisted.full_event_name_hash AS FullEventNameHash,
events_persisted.event_keywords AS Keywords,
provider_groups.group_guid AS GroupGUID,
CASE

WHEN events_persisted.is_core = 0 THEN
'No'
WHEN events_persisted.is_core = 1 THEN
'Yes' ELSE 'Unknown'
END AS IsCore,
events_persisted.compressed_payload_size AS CompressedPayloadSize,
events_persisted.payload AS JSONPayload
FROM
events_persisted
LEFT JOIN producers ON events_persisted.producer_id = producers.producer_id
LEFT JOIN event_tags ON events_persisted.full_event_name_hash = event_tags.full_event_name_hash
LEFT JOIN tag_descriptions ON event_tags.tag_id = tag_descriptions.tag_id
LEFT JOIN provider_groups ON events_persisted.provider_group_id = provider_groups.group_id
WHERE
TagName = 'Product and Service Usage'
ORDER BY
events_persisted.timestamp ASC
`,baseFileName:`EventTranscriptDB_ProductandServiceUsage_DataSampling`,blobColumns:[]},{name:`Windows EventTranscript.db Software Setup and Inventory`,query:`SELECT
CASE

WHEN
events_persisted.sid = 'S-1-0' THEN
'S-1-0 (Null Authority)'
WHEN events_persisted.sid = 'S-1-0-0' THEN
'S-1-0-0 (Nobody)'
WHEN events_persisted.sid = 'S-1-1' THEN
'S-1-1 (World Authority)'
WHEN events_persisted.sid = 'S-1-1-0' THEN
'S-1-1-0 (Everyone)'
WHEN events_persisted.sid = 'S-1-16-0' THEN
'S-1-16-0 (Untrusted Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-12288' THEN
'S-1-16-12288 (High Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-16384' THEN
'S-1-16-16384 (System Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-20480' THEN
'S-1-16-20480 (Protected Process Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-28672' THEN
'S-1-16-28672 (Secure Process Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-4096' THEN
'S-1-16-4096 (Low Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-8192' THEN
'S-1-16-8192 (Medium Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-8448' THEN
'S-1-16-8448 (Medium Plus Mandatory Level)'
WHEN events_persisted.sid = 'S-1-2' THEN
'S-1-2 (Local Authority)'
WHEN events_persisted.sid = 'S-1-2-0' THEN
'S-1-2-0 (Local)'
WHEN events_persisted.sid = 'S-1-2-1' THEN
'S-1-2-1 (Console Logon)'
WHEN events_persisted.sid = 'S-1-3' THEN
'S-1-3 (Creator Authority)'
WHEN events_persisted.sid = 'S-1-3-0' THEN
'S-1-3-0 (Creator Owner)'
WHEN events_persisted.sid = 'S-1-3-1' THEN
'S-1-3-1 (Creator Group)'
WHEN events_persisted.sid = 'S-1-3-2' THEN
'S-1-3-2 (Creator Owner Server)'
WHEN events_persisted.sid = 'S-1-3-3' THEN
'S-1-3-3 (Creator Group Server)'
WHEN events_persisted.sid = 'S-1-3-4' THEN
'S-1-3-4 (Owner Rights)'
WHEN events_persisted.sid = 'S-1-4' THEN
'S-1-4 (Non-unique Authority)'
WHEN events_persisted.sid = 'S-1-5' THEN
'S-1-5 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-1' THEN
'S-1-5-1 (Dialup)'
WHEN events_persisted.sid = 'S-1-5-10' THEN
'S-1-5-10 (Principal Self)'
WHEN events_persisted.sid = 'S-1-5-11' THEN
'S-1-5-11 (Authenticated Users)'
WHEN events_persisted.sid = 'S-1-5-12' THEN
'S-1-5-12 (Restricted Code)'
WHEN events_persisted.sid = 'S-1-5-13' THEN
'S-1-5-13 (Terminal Server Users)'
WHEN events_persisted.sid = 'S-1-5-14' THEN
'S-1-5-14 (Remote Interactive Logon)'
WHEN events_persisted.sid = 'S-1-5-15' THEN
'S-1-5-15 (This Organization)'
WHEN events_persisted.sid = 'S-1-5-17' THEN
'S-1-5-17 (IUSR)'
WHEN events_persisted.sid = 'S-1-5-18' THEN
'S-1-5-18 (Local System)'
WHEN events_persisted.sid = 'S-1-5-19' THEN
'S-1-5-19 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-2' THEN
'S-1-5-2 (Network)'
WHEN events_persisted.sid = 'S-1-5-20' THEN
'S-1-5-20 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-21domain-498' THEN
'S-1-5-21domain-498 (Enterprise Read-only Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-521' THEN
'S-1-5-21domain-521 (Read-only Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-571' THEN
'S-1-5-21domain-571 (Allowed RODC Password Replication Group)'
WHEN events_persisted.sid = 'S-1-5-21domain-572' THEN
'S-1-5-21domain-572 (Denied RODC Password Replication Group)'
WHEN events_persisted.sid = 'S-1-5-21domain-500' THEN
'S-1-5-21domain-500 (Administrator)'
WHEN events_persisted.sid = 'S-1-5-21domain-501' THEN
'S-1-5-21domain-501 (Guest)'
WHEN events_persisted.sid = 'S-1-5-21domain-502' THEN
'S-1-5-21domain-502 (KRBTGT)'
WHEN events_persisted.sid = 'S-1-5-21domain-512' THEN
'S-1-5-21domain-512 (Domain Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-513' THEN
'S-1-5-21domain-513 (Domain Users)'
WHEN events_persisted.sid = 'S-1-5-21domain-514' THEN
'S-1-5-21domain-514 (Domain Guests)'
WHEN events_persisted.sid = 'S-1-5-21domain-515' THEN
'S-1-5-21domain-515 (Domain Computers)'
WHEN events_persisted.sid = 'S-1-5-21domain-516' THEN
'S-1-5-21domain-516 (Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-517' THEN
'S-1-5-21domain-517 (Cert Publishers)'
WHEN events_persisted.sid = 'S-1-5-21domain-520' THEN
'S-1-5-21domain-520 (Group Policy Creator Owners)'
WHEN events_persisted.sid = 'S-1-5-21-domain-522' THEN
'S-1-5-21-domain-522 (Cloneable Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-526' THEN
'S-1-5-21domain-526 (Key Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-527' THEN
'S-1-5-21domain-527 (Enterprise Key Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-553' THEN
'S-1-5-21domain-553 (RAS and IAS Servers)'
WHEN events_persisted.sid = 'S-1-5-21root domain-518' THEN
'S-1-5-21root domain-518 (Schema Admins)'
WHEN events_persisted.sid = 'S-1-5-21root domain-519' THEN
'S-1-5-21root domain-519 (Enterprise Admins)'
WHEN events_persisted.sid = 'S-1-5-3' THEN
'S-1-5-3 (Batch)'
WHEN events_persisted.sid = 'S-1-5-32-544' THEN
'S-1-5-32-544 (Administrators)'
WHEN events_persisted.sid = 'S-1-5-32-545' THEN
'S-1-5-32-545 (Users)'
WHEN events_persisted.sid = 'S-1-5-32-546' THEN
'S-1-5-32-546 (Guests)'
WHEN events_persisted.sid = 'S-1-5-32-547' THEN
'S-1-5-32-547 (Power Users)'
WHEN events_persisted.sid = 'S-1-5-32-548' THEN
'S-1-5-32-548 (Account Operators)'
WHEN events_persisted.sid = 'S-1-5-32-549' THEN
'S-1-5-32-549 (Server Operators)'
WHEN events_persisted.sid = 'S-1-5-32-550' THEN
'S-1-5-32-550 (Print Operators)'
WHEN events_persisted.sid = 'S-1-5-32-551' THEN
'S-1-5-32-551 (Backup Operators)'
WHEN events_persisted.sid = 'S-1-5-32-552' THEN
'S-1-5-32-552 (Replicators)'
WHEN events_persisted.sid = 'S-1-5-32-554' THEN
'S-1-5-32-554 (Builtin\\Pre-Windows 2000 Compatible Access)'
WHEN events_persisted.sid = 'S-1-5-32-555' THEN
'S-1-5-32-555 (Builtin\\Remote Desktop Users)'
WHEN events_persisted.sid = 'S-1-5-32-556' THEN
'S-1-5-32-556 (Builtin\\Network Configuration Operators)'
WHEN events_persisted.sid = 'S-1-5-32-557' THEN
'S-1-5-32-557 (Builtin\\Incoming Forest Trust Builders)'
WHEN events_persisted.sid = 'S-1-5-32-558' THEN
'S-1-5-32-558 (Builtin\\Performance Monitor Users)'
WHEN events_persisted.sid = 'S-1-5-32-559' THEN
'S-1-5-32-559 (Builtin\\Performance Log Users)'
WHEN events_persisted.sid = 'S-1-5-32-560' THEN
'S-1-5-32-560 (Builtin\\Windows Authorization Access Group)'
WHEN events_persisted.sid = 'S-1-5-32-561' THEN
'S-1-5-32-561 (Builtin\\Terminal Server License Servers)'
WHEN events_persisted.sid = 'S-1-5-32-562' THEN
'S-1-5-32-562 (Builtin\\Distributed COM Users)'
WHEN events_persisted.sid = 'S-1-5-32-569' THEN
'S-1-5-32-569 (Builtin\\Cryptographic Operators)'
WHEN events_persisted.sid = 'S-1-5-32-573' THEN
'S-1-5-32-573 (Builtin\\Event Log Readers)'
WHEN events_persisted.sid = 'S-1-5-32-574' THEN
'S-1-5-32-574 (Builtin\\Certificate Service DCOM Access)'
WHEN events_persisted.sid = 'S-1-5-32-575' THEN
'S-1-5-32-575 (Builtin\\RDS Remote Access Servers)'
WHEN events_persisted.sid = 'S-1-5-32-576' THEN
'S-1-5-32-576 (Builtin\\RDS Endpoint Servers)'
WHEN events_persisted.sid = 'S-1-5-32-577' THEN
'S-1-5-32-577 (Builtin\\RDS Management Servers)'
WHEN events_persisted.sid = 'S-1-5-32-578' THEN
'S-1-5-32-578 (Builtin\\Hyper-V Administrators)'
WHEN events_persisted.sid = 'S-1-5-32-579' THEN
'S-1-5-32-579 (Builtin\\Access Control Assistance Operators)'
WHEN events_persisted.sid = 'S-1-5-32-580' THEN
'S-1-5-32-580 (Builtin\\Remote Management Users)'
WHEN events_persisted.sid = 'S-1-5-32-582' THEN
'S-1-5-32-582 (Storage Replica Administrators)'
WHEN events_persisted.sid = 'S-1-5-4' THEN
'S-1-5-4 (Interactive)'
WHEN events_persisted.sid = 'S-1-5-5-X-Y' THEN
'S-1-5-5-X-Y (Logon Session)'
WHEN events_persisted.sid = 'S-1-5-6' THEN
'S-1-5-6 (Service)'
WHEN events_persisted.sid = 'S-1-5-64-10' THEN
'S-1-5-64-10 (NTLM Authentication)'
WHEN events_persisted.sid = 'S-1-5-64-14' THEN
'S-1-5-64-14 (SChannelAuthentication)'
WHEN events_persisted.sid = 'S-1-5-64-21' THEN
'S-1-5-64-21 (Digest Authentication)'
WHEN events_persisted.sid = 'S-1-5-7' THEN
'S-1-5-7 (Anonymous)'
WHEN events_persisted.sid = 'S-1-5-8' THEN
'S-1-5-8 (Proxy)'
WHEN events_persisted.sid = 'S-1-5-80' THEN
'S-1-5-80 (NT Service)'
WHEN events_persisted.sid = 'S-1-5-80-0' THEN
'S-1-5-80-0 (NT Services\\All Services)'
WHEN events_persisted.sid = 'S-1-5-80-0' THEN
'S-1-5-80-0 (All Services)'
WHEN events_persisted.sid = 'S-1-5-83-0' THEN
'S-1-5-83-0 (NT Virtual Machine\\Virtual Machines)'
WHEN events_persisted.sid = 'S-1-5-9' THEN
'S-1-5-9 (Enterprise Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-90-0' THEN
'S-1-5-90-0 (Windows Manager\\Windows Manager Group)' ELSE events_persisted.sid
END AS UserSID,
datetime( ( events_persisted.timestamp / 10000000 ) - 11644473600, 'unixepoch' ) AS Timestamp,
tag_descriptions.locale_name AS LocaleName,
producers.producer_id_text AS ProducerIDText,
tag_descriptions.tag_name AS TagName,
events_persisted.full_event_name AS FullEventName,
events_persisted.logging_binary_name AS LoggingBinaryName,
events_persisted.friendly_logging_binary_name AS FriendlyLoggingBinaryName,
events_persisted.full_event_name_hash AS FullEventNameHash,
events_persisted.event_keywords AS Keywords,
provider_groups.group_guid AS GroupGUID,
CASE

WHEN events_persisted.is_core = 0 THEN
'No'
WHEN events_persisted.is_core = 1 THEN
'Yes' ELSE 'Unknown'
END AS IsCore,
events_persisted.compressed_payload_size AS CompressedPayloadSize,
events_persisted.payload AS JSONPayload
FROM
events_persisted
LEFT JOIN producers ON events_persisted.producer_id = producers.producer_id
LEFT JOIN event_tags ON events_persisted.full_event_name_hash = event_tags.full_event_name_hash
LEFT JOIN tag_descriptions ON event_tags.tag_id = tag_descriptions.tag_id
LEFT JOIN provider_groups ON events_persisted.provider_group_id = provider_groups.group_id
WHERE
TagName = 'Software Setup and Inventory'
ORDER BY
events_persisted.timestamp ASC
`,baseFileName:`EventTranscriptDB_SoftwareSetupandInventory_DataSampling`,blobColumns:[]}]},{id:`b28f0ea6-d514-4452-a70b-fa29ba303e15`,description:`EventTranscript.db - No Data Sampling`,csvPrefix:`Windows`,fileName:`EventTranscript.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='categories' OR name='event_categories' OR name='event_tags' OR name='events_persisted' OR name='producers' OR name='provider_groups' OR name='tag_descriptions');`,identifyValue:`4`,queries:[{name:`Windows EventTranscript.db BrowsingHistory`,query:`SELECT
CASE

WHEN
events_persisted.sid = 'S-1-0' THEN
'S-1-0 (Null Authority)'
WHEN events_persisted.sid = 'S-1-0-0' THEN
'S-1-0-0 (Nobody)'
WHEN events_persisted.sid = 'S-1-1' THEN
'S-1-1 (World Authority)'
WHEN events_persisted.sid = 'S-1-1-0' THEN
'S-1-1-0 (Everyone)'
WHEN events_persisted.sid = 'S-1-16-0' THEN
'S-1-16-0 (Untrusted Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-12288' THEN
'S-1-16-12288 (High Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-16384' THEN
'S-1-16-16384 (System Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-20480' THEN
'S-1-16-20480 (Protected Process Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-28672' THEN
'S-1-16-28672 (Secure Process Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-4096' THEN
'S-1-16-4096 (Low Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-8192' THEN
'S-1-16-8192 (Medium Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-8448' THEN
'S-1-16-8448 (Medium Plus Mandatory Level)'
WHEN events_persisted.sid = 'S-1-2' THEN
'S-1-2 (Local Authority)'
WHEN events_persisted.sid = 'S-1-2-0' THEN
'S-1-2-0 (Local)'
WHEN events_persisted.sid = 'S-1-2-1' THEN
'S-1-2-1 (Console Logon)'
WHEN events_persisted.sid = 'S-1-3' THEN
'S-1-3 (Creator Authority)'
WHEN events_persisted.sid = 'S-1-3-0' THEN
'S-1-3-0 (Creator Owner)'
WHEN events_persisted.sid = 'S-1-3-1' THEN
'S-1-3-1 (Creator Group)'
WHEN events_persisted.sid = 'S-1-3-2' THEN
'S-1-3-2 (Creator Owner Server)'
WHEN events_persisted.sid = 'S-1-3-3' THEN
'S-1-3-3 (Creator Group Server)'
WHEN events_persisted.sid = 'S-1-3-4' THEN
'S-1-3-4 (Owner Rights)'
WHEN events_persisted.sid = 'S-1-4' THEN
'S-1-4 (Non-unique Authority)'
WHEN events_persisted.sid = 'S-1-5' THEN
'S-1-5 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-1' THEN
'S-1-5-1 (Dialup)'
WHEN events_persisted.sid = 'S-1-5-10' THEN
'S-1-5-10 (Principal Self)'
WHEN events_persisted.sid = 'S-1-5-11' THEN
'S-1-5-11 (Authenticated Users)'
WHEN events_persisted.sid = 'S-1-5-12' THEN
'S-1-5-12 (Restricted Code)'
WHEN events_persisted.sid = 'S-1-5-13' THEN
'S-1-5-13 (Terminal Server Users)'
WHEN events_persisted.sid = 'S-1-5-14' THEN
'S-1-5-14 (Remote Interactive Logon)'
WHEN events_persisted.sid = 'S-1-5-15' THEN
'S-1-5-15 (This Organization)'
WHEN events_persisted.sid = 'S-1-5-17' THEN
'S-1-5-17 (IUSR)'
WHEN events_persisted.sid = 'S-1-5-18' THEN
'S-1-5-18 (Local System)'
WHEN events_persisted.sid = 'S-1-5-19' THEN
'S-1-5-19 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-2' THEN
'S-1-5-2 (Network)'
WHEN events_persisted.sid = 'S-1-5-20' THEN
'S-1-5-20 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-21domain-498' THEN
'S-1-5-21domain-498 (Enterprise Read-only Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-521' THEN
'S-1-5-21domain-521 (Read-only Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-571' THEN
'S-1-5-21domain-571 (Allowed RODC Password Replication Group)'
WHEN events_persisted.sid = 'S-1-5-21domain-572' THEN
'S-1-5-21domain-572 (Denied RODC Password Replication Group)'
WHEN events_persisted.sid = 'S-1-5-21domain-500' THEN
'S-1-5-21domain-500 (Administrator)'
WHEN events_persisted.sid = 'S-1-5-21domain-501' THEN
'S-1-5-21domain-501 (Guest)'
WHEN events_persisted.sid = 'S-1-5-21domain-502' THEN
'S-1-5-21domain-502 (KRBTGT)'
WHEN events_persisted.sid = 'S-1-5-21domain-512' THEN
'S-1-5-21domain-512 (Domain Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-513' THEN
'S-1-5-21domain-513 (Domain Users)'
WHEN events_persisted.sid = 'S-1-5-21domain-514' THEN
'S-1-5-21domain-514 (Domain Guests)'
WHEN events_persisted.sid = 'S-1-5-21domain-515' THEN
'S-1-5-21domain-515 (Domain Computers)'
WHEN events_persisted.sid = 'S-1-5-21domain-516' THEN
'S-1-5-21domain-516 (Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-517' THEN
'S-1-5-21domain-517 (Cert Publishers)'
WHEN events_persisted.sid = 'S-1-5-21domain-520' THEN
'S-1-5-21domain-520 (Group Policy Creator Owners)'
WHEN events_persisted.sid = 'S-1-5-21-domain-522' THEN
'S-1-5-21-domain-522 (Cloneable Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-526' THEN
'S-1-5-21domain-526 (Key Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-527' THEN
'S-1-5-21domain-527 (Enterprise Key Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-553' THEN
'S-1-5-21domain-553 (RAS and IAS Servers)'
WHEN events_persisted.sid = 'S-1-5-21root domain-518' THEN
'S-1-5-21root domain-518 (Schema Admins)'
WHEN events_persisted.sid = 'S-1-5-21root domain-519' THEN
'S-1-5-21root domain-519 (Enterprise Admins)'
WHEN events_persisted.sid = 'S-1-5-3' THEN
'S-1-5-3 (Batch)'
WHEN events_persisted.sid = 'S-1-5-32-544' THEN
'S-1-5-32-544 (Administrators)'
WHEN events_persisted.sid = 'S-1-5-32-545' THEN
'S-1-5-32-545 (Users)'
WHEN events_persisted.sid = 'S-1-5-32-546' THEN
'S-1-5-32-546 (Guests)'
WHEN events_persisted.sid = 'S-1-5-32-547' THEN
'S-1-5-32-547 (Power Users)'
WHEN events_persisted.sid = 'S-1-5-32-548' THEN
'S-1-5-32-548 (Account Operators)'
WHEN events_persisted.sid = 'S-1-5-32-549' THEN
'S-1-5-32-549 (Server Operators)'
WHEN events_persisted.sid = 'S-1-5-32-550' THEN
'S-1-5-32-550 (Print Operators)'
WHEN events_persisted.sid = 'S-1-5-32-551' THEN
'S-1-5-32-551 (Backup Operators)'
WHEN events_persisted.sid = 'S-1-5-32-552' THEN
'S-1-5-32-552 (Replicators)'
WHEN events_persisted.sid = 'S-1-5-32-554' THEN
'S-1-5-32-554 (Builtin\\Pre-Windows 2000 Compatible Access)'
WHEN events_persisted.sid = 'S-1-5-32-555' THEN
'S-1-5-32-555 (Builtin\\Remote Desktop Users)'
WHEN events_persisted.sid = 'S-1-5-32-556' THEN
'S-1-5-32-556 (Builtin\\Network Configuration Operators)'
WHEN events_persisted.sid = 'S-1-5-32-557' THEN
'S-1-5-32-557 (Builtin\\Incoming Forest Trust Builders)'
WHEN events_persisted.sid = 'S-1-5-32-558' THEN
'S-1-5-32-558 (Builtin\\Performance Monitor Users)'
WHEN events_persisted.sid = 'S-1-5-32-559' THEN
'S-1-5-32-559 (Builtin\\Performance Log Users)'
WHEN events_persisted.sid = 'S-1-5-32-560' THEN
'S-1-5-32-560 (Builtin\\Windows Authorization Access Group)'
WHEN events_persisted.sid = 'S-1-5-32-561' THEN
'S-1-5-32-561 (Builtin\\Terminal Server License Servers)'
WHEN events_persisted.sid = 'S-1-5-32-562' THEN
'S-1-5-32-562 (Builtin\\Distributed COM Users)'
WHEN events_persisted.sid = 'S-1-5-32-569' THEN
'S-1-5-32-569 (Builtin\\Cryptographic Operators)'
WHEN events_persisted.sid = 'S-1-5-32-573' THEN
'S-1-5-32-573 (Builtin\\Event Log Readers)'
WHEN events_persisted.sid = 'S-1-5-32-574' THEN
'S-1-5-32-574 (Builtin\\Certificate Service DCOM Access)'
WHEN events_persisted.sid = 'S-1-5-32-575' THEN
'S-1-5-32-575 (Builtin\\RDS Remote Access Servers)'
WHEN events_persisted.sid = 'S-1-5-32-576' THEN
'S-1-5-32-576 (Builtin\\RDS Endpoint Servers)'
WHEN events_persisted.sid = 'S-1-5-32-577' THEN
'S-1-5-32-577 (Builtin\\RDS Management Servers)'
WHEN events_persisted.sid = 'S-1-5-32-578' THEN
'S-1-5-32-578 (Builtin\\Hyper-V Administrators)'
WHEN events_persisted.sid = 'S-1-5-32-579' THEN
'S-1-5-32-579 (Builtin\\Access Control Assistance Operators)'
WHEN events_persisted.sid = 'S-1-5-32-580' THEN
'S-1-5-32-580 (Builtin\\Remote Management Users)'
WHEN events_persisted.sid = 'S-1-5-32-582' THEN
'S-1-5-32-582 (Storage Replica Administrators)'
WHEN events_persisted.sid = 'S-1-5-4' THEN
'S-1-5-4 (Interactive)'
WHEN events_persisted.sid = 'S-1-5-5-X-Y' THEN
'S-1-5-5-X-Y (Logon Session)'
WHEN events_persisted.sid = 'S-1-5-6' THEN
'S-1-5-6 (Service)'
WHEN events_persisted.sid = 'S-1-5-64-10' THEN
'S-1-5-64-10 (NTLM Authentication)'
WHEN events_persisted.sid = 'S-1-5-64-14' THEN
'S-1-5-64-14 (SChannelAuthentication)'
WHEN events_persisted.sid = 'S-1-5-64-21' THEN
'S-1-5-64-21 (Digest Authentication)'
WHEN events_persisted.sid = 'S-1-5-7' THEN
'S-1-5-7 (Anonymous)'
WHEN events_persisted.sid = 'S-1-5-8' THEN
'S-1-5-8 (Proxy)'
WHEN events_persisted.sid = 'S-1-5-80' THEN
'S-1-5-80 (NT Service)'
WHEN events_persisted.sid = 'S-1-5-80-0' THEN
'S-1-5-80-0 (NT Services\\All Services)'
WHEN events_persisted.sid = 'S-1-5-80-0' THEN
'S-1-5-80-0 (All Services)'
WHEN events_persisted.sid = 'S-1-5-83-0' THEN
'S-1-5-83-0 (NT Virtual Machine\\Virtual Machines)'
WHEN events_persisted.sid = 'S-1-5-9' THEN
'S-1-5-9 (Enterprise Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-90-0' THEN
'S-1-5-90-0 (Windows Manager\\Windows Manager Group)' ELSE events_persisted.sid
END AS UserSID,
datetime( ( events_persisted.timestamp / 10000000 ) - 11644473600, 'unixepoch' ) AS Timestamp,
tag_descriptions.locale_name AS LocaleName,
tag_descriptions.tag_name AS TagName,
events_persisted.full_event_name AS FullEventName,
events_persisted.logging_binary_name AS LoggingBinaryName,
events_persisted.friendly_logging_binary_name AS FriendlyLoggingBinaryName,
events_persisted.full_event_name_hash AS FullEventNameHash,
events_persisted.event_keywords AS Keywords,
provider_groups.group_guid AS GroupGUID,
CASE

WHEN events_persisted.is_core = 0 THEN
'No'
WHEN events_persisted.is_core = 1 THEN
'Yes' ELSE 'Unknown'
END AS IsCore,
events_persisted.compressed_payload_size AS CompressedPayloadSize,
events_persisted.payload AS JSONPayload
FROM
events_persisted
LEFT JOIN event_tags ON events_persisted.full_event_name_hash = event_tags.full_event_name_hash
LEFT JOIN tag_descriptions ON event_tags.tag_id = tag_descriptions.tag_id
LEFT JOIN provider_groups ON events_persisted.provider_group_id = provider_groups.group_id
WHERE
TagName = 'Browsing History'
ORDER BY
events_persisted.timestamp ASC
`,baseFileName:`EventTranscriptDB_BrowsingHistory_NoDataSampling`,blobColumns:[]},{name:`Windows EventTranscript.db Device Connectivity and Configuration`,query:`SELECT
CASE

WHEN
events_persisted.sid = 'S-1-0' THEN
'S-1-0 (Null Authority)'
WHEN events_persisted.sid = 'S-1-0-0' THEN
'S-1-0-0 (Nobody)'
WHEN events_persisted.sid = 'S-1-1' THEN
'S-1-1 (World Authority)'
WHEN events_persisted.sid = 'S-1-1-0' THEN
'S-1-1-0 (Everyone)'
WHEN events_persisted.sid = 'S-1-16-0' THEN
'S-1-16-0 (Untrusted Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-12288' THEN
'S-1-16-12288 (High Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-16384' THEN
'S-1-16-16384 (System Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-20480' THEN
'S-1-16-20480 (Protected Process Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-28672' THEN
'S-1-16-28672 (Secure Process Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-4096' THEN
'S-1-16-4096 (Low Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-8192' THEN
'S-1-16-8192 (Medium Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-8448' THEN
'S-1-16-8448 (Medium Plus Mandatory Level)'
WHEN events_persisted.sid = 'S-1-2' THEN
'S-1-2 (Local Authority)'
WHEN events_persisted.sid = 'S-1-2-0' THEN
'S-1-2-0 (Local)'
WHEN events_persisted.sid = 'S-1-2-1' THEN
'S-1-2-1 (Console Logon)'
WHEN events_persisted.sid = 'S-1-3' THEN
'S-1-3 (Creator Authority)'
WHEN events_persisted.sid = 'S-1-3-0' THEN
'S-1-3-0 (Creator Owner)'
WHEN events_persisted.sid = 'S-1-3-1' THEN
'S-1-3-1 (Creator Group)'
WHEN events_persisted.sid = 'S-1-3-2' THEN
'S-1-3-2 (Creator Owner Server)'
WHEN events_persisted.sid = 'S-1-3-3' THEN
'S-1-3-3 (Creator Group Server)'
WHEN events_persisted.sid = 'S-1-3-4' THEN
'S-1-3-4 (Owner Rights)'
WHEN events_persisted.sid = 'S-1-4' THEN
'S-1-4 (Non-unique Authority)'
WHEN events_persisted.sid = 'S-1-5' THEN
'S-1-5 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-1' THEN
'S-1-5-1 (Dialup)'
WHEN events_persisted.sid = 'S-1-5-10' THEN
'S-1-5-10 (Principal Self)'
WHEN events_persisted.sid = 'S-1-5-11' THEN
'S-1-5-11 (Authenticated Users)'
WHEN events_persisted.sid = 'S-1-5-12' THEN
'S-1-5-12 (Restricted Code)'
WHEN events_persisted.sid = 'S-1-5-13' THEN
'S-1-5-13 (Terminal Server Users)'
WHEN events_persisted.sid = 'S-1-5-14' THEN
'S-1-5-14 (Remote Interactive Logon)'
WHEN events_persisted.sid = 'S-1-5-15' THEN
'S-1-5-15 (This Organization)'
WHEN events_persisted.sid = 'S-1-5-17' THEN
'S-1-5-17 (IUSR)'
WHEN events_persisted.sid = 'S-1-5-18' THEN
'S-1-5-18 (Local System)'
WHEN events_persisted.sid = 'S-1-5-19' THEN
'S-1-5-19 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-2' THEN
'S-1-5-2 (Network)'
WHEN events_persisted.sid = 'S-1-5-20' THEN
'S-1-5-20 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-21domain-498' THEN
'S-1-5-21domain-498 (Enterprise Read-only Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-521' THEN
'S-1-5-21domain-521 (Read-only Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-571' THEN
'S-1-5-21domain-571 (Allowed RODC Password Replication Group)'
WHEN events_persisted.sid = 'S-1-5-21domain-572' THEN
'S-1-5-21domain-572 (Denied RODC Password Replication Group)'
WHEN events_persisted.sid = 'S-1-5-21domain-500' THEN
'S-1-5-21domain-500 (Administrator)'
WHEN events_persisted.sid = 'S-1-5-21domain-501' THEN
'S-1-5-21domain-501 (Guest)'
WHEN events_persisted.sid = 'S-1-5-21domain-502' THEN
'S-1-5-21domain-502 (KRBTGT)'
WHEN events_persisted.sid = 'S-1-5-21domain-512' THEN
'S-1-5-21domain-512 (Domain Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-513' THEN
'S-1-5-21domain-513 (Domain Users)'
WHEN events_persisted.sid = 'S-1-5-21domain-514' THEN
'S-1-5-21domain-514 (Domain Guests)'
WHEN events_persisted.sid = 'S-1-5-21domain-515' THEN
'S-1-5-21domain-515 (Domain Computers)'
WHEN events_persisted.sid = 'S-1-5-21domain-516' THEN
'S-1-5-21domain-516 (Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-517' THEN
'S-1-5-21domain-517 (Cert Publishers)'
WHEN events_persisted.sid = 'S-1-5-21domain-520' THEN
'S-1-5-21domain-520 (Group Policy Creator Owners)'
WHEN events_persisted.sid = 'S-1-5-21-domain-522' THEN
'S-1-5-21-domain-522 (Cloneable Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-526' THEN
'S-1-5-21domain-526 (Key Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-527' THEN
'S-1-5-21domain-527 (Enterprise Key Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-553' THEN
'S-1-5-21domain-553 (RAS and IAS Servers)'
WHEN events_persisted.sid = 'S-1-5-21root domain-518' THEN
'S-1-5-21root domain-518 (Schema Admins)'
WHEN events_persisted.sid = 'S-1-5-21root domain-519' THEN
'S-1-5-21root domain-519 (Enterprise Admins)'
WHEN events_persisted.sid = 'S-1-5-3' THEN
'S-1-5-3 (Batch)'
WHEN events_persisted.sid = 'S-1-5-32-544' THEN
'S-1-5-32-544 (Administrators)'
WHEN events_persisted.sid = 'S-1-5-32-545' THEN
'S-1-5-32-545 (Users)'
WHEN events_persisted.sid = 'S-1-5-32-546' THEN
'S-1-5-32-546 (Guests)'
WHEN events_persisted.sid = 'S-1-5-32-547' THEN
'S-1-5-32-547 (Power Users)'
WHEN events_persisted.sid = 'S-1-5-32-548' THEN
'S-1-5-32-548 (Account Operators)'
WHEN events_persisted.sid = 'S-1-5-32-549' THEN
'S-1-5-32-549 (Server Operators)'
WHEN events_persisted.sid = 'S-1-5-32-550' THEN
'S-1-5-32-550 (Print Operators)'
WHEN events_persisted.sid = 'S-1-5-32-551' THEN
'S-1-5-32-551 (Backup Operators)'
WHEN events_persisted.sid = 'S-1-5-32-552' THEN
'S-1-5-32-552 (Replicators)'
WHEN events_persisted.sid = 'S-1-5-32-554' THEN
'S-1-5-32-554 (Builtin\\Pre-Windows 2000 Compatible Access)'
WHEN events_persisted.sid = 'S-1-5-32-555' THEN
'S-1-5-32-555 (Builtin\\Remote Desktop Users)'
WHEN events_persisted.sid = 'S-1-5-32-556' THEN
'S-1-5-32-556 (Builtin\\Network Configuration Operators)'
WHEN events_persisted.sid = 'S-1-5-32-557' THEN
'S-1-5-32-557 (Builtin\\Incoming Forest Trust Builders)'
WHEN events_persisted.sid = 'S-1-5-32-558' THEN
'S-1-5-32-558 (Builtin\\Performance Monitor Users)'
WHEN events_persisted.sid = 'S-1-5-32-559' THEN
'S-1-5-32-559 (Builtin\\Performance Log Users)'
WHEN events_persisted.sid = 'S-1-5-32-560' THEN
'S-1-5-32-560 (Builtin\\Windows Authorization Access Group)'
WHEN events_persisted.sid = 'S-1-5-32-561' THEN
'S-1-5-32-561 (Builtin\\Terminal Server License Servers)'
WHEN events_persisted.sid = 'S-1-5-32-562' THEN
'S-1-5-32-562 (Builtin\\Distributed COM Users)'
WHEN events_persisted.sid = 'S-1-5-32-569' THEN
'S-1-5-32-569 (Builtin\\Cryptographic Operators)'
WHEN events_persisted.sid = 'S-1-5-32-573' THEN
'S-1-5-32-573 (Builtin\\Event Log Readers)'
WHEN events_persisted.sid = 'S-1-5-32-574' THEN
'S-1-5-32-574 (Builtin\\Certificate Service DCOM Access)'
WHEN events_persisted.sid = 'S-1-5-32-575' THEN
'S-1-5-32-575 (Builtin\\RDS Remote Access Servers)'
WHEN events_persisted.sid = 'S-1-5-32-576' THEN
'S-1-5-32-576 (Builtin\\RDS Endpoint Servers)'
WHEN events_persisted.sid = 'S-1-5-32-577' THEN
'S-1-5-32-577 (Builtin\\RDS Management Servers)'
WHEN events_persisted.sid = 'S-1-5-32-578' THEN
'S-1-5-32-578 (Builtin\\Hyper-V Administrators)'
WHEN events_persisted.sid = 'S-1-5-32-579' THEN
'S-1-5-32-579 (Builtin\\Access Control Assistance Operators)'
WHEN events_persisted.sid = 'S-1-5-32-580' THEN
'S-1-5-32-580 (Builtin\\Remote Management Users)'
WHEN events_persisted.sid = 'S-1-5-32-582' THEN
'S-1-5-32-582 (Storage Replica Administrators)'
WHEN events_persisted.sid = 'S-1-5-4' THEN
'S-1-5-4 (Interactive)'
WHEN events_persisted.sid = 'S-1-5-5-X-Y' THEN
'S-1-5-5-X-Y (Logon Session)'
WHEN events_persisted.sid = 'S-1-5-6' THEN
'S-1-5-6 (Service)'
WHEN events_persisted.sid = 'S-1-5-64-10' THEN
'S-1-5-64-10 (NTLM Authentication)'
WHEN events_persisted.sid = 'S-1-5-64-14' THEN
'S-1-5-64-14 (SChannelAuthentication)'
WHEN events_persisted.sid = 'S-1-5-64-21' THEN
'S-1-5-64-21 (Digest Authentication)'
WHEN events_persisted.sid = 'S-1-5-7' THEN
'S-1-5-7 (Anonymous)'
WHEN events_persisted.sid = 'S-1-5-8' THEN
'S-1-5-8 (Proxy)'
WHEN events_persisted.sid = 'S-1-5-80' THEN
'S-1-5-80 (NT Service)'
WHEN events_persisted.sid = 'S-1-5-80-0' THEN
'S-1-5-80-0 (NT Services\\All Services)'
WHEN events_persisted.sid = 'S-1-5-80-0' THEN
'S-1-5-80-0 (All Services)'
WHEN events_persisted.sid = 'S-1-5-83-0' THEN
'S-1-5-83-0 (NT Virtual Machine\\Virtual Machines)'
WHEN events_persisted.sid = 'S-1-5-9' THEN
'S-1-5-9 (Enterprise Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-90-0' THEN
'S-1-5-90-0 (Windows Manager\\Windows Manager Group)' ELSE events_persisted.sid
END AS UserSID,
datetime( ( events_persisted.timestamp / 10000000 ) - 11644473600, 'unixepoch' ) AS Timestamp,
tag_descriptions.locale_name AS LocaleName,
tag_descriptions.tag_name AS TagName,
events_persisted.full_event_name AS FullEventName,
events_persisted.logging_binary_name AS LoggingBinaryName,
events_persisted.friendly_logging_binary_name AS FriendlyLoggingBinaryName,
events_persisted.full_event_name_hash AS FullEventNameHash,
events_persisted.event_keywords AS Keywords,
provider_groups.group_guid AS GroupGUID,
CASE

WHEN events_persisted.is_core = 0 THEN
'No'
WHEN events_persisted.is_core = 1 THEN
'Yes' ELSE 'Unknown'
END AS IsCore,
events_persisted.compressed_payload_size AS CompressedPayloadSize,
events_persisted.payload AS JSONPayload
FROM
events_persisted
LEFT JOIN event_tags ON events_persisted.full_event_name_hash = event_tags.full_event_name_hash
LEFT JOIN tag_descriptions ON event_tags.tag_id = tag_descriptions.tag_id
LEFT JOIN provider_groups ON events_persisted.provider_group_id = provider_groups.group_id
WHERE
TagName = 'Device Connectivity and Configuration'
ORDER BY
events_persisted.timestamp ASC
`,baseFileName:`EventTranscriptDB_DeviceConnectivityandConfiguration_NoDataSampling`,blobColumns:[]},{name:`Windows EventTranscript.db Inking Typing and Speech Utterance`,query:`SELECT
CASE

WHEN
events_persisted.sid = 'S-1-0' THEN
'S-1-0 (Null Authority)'
WHEN events_persisted.sid = 'S-1-0-0' THEN
'S-1-0-0 (Nobody)'
WHEN events_persisted.sid = 'S-1-1' THEN
'S-1-1 (World Authority)'
WHEN events_persisted.sid = 'S-1-1-0' THEN
'S-1-1-0 (Everyone)'
WHEN events_persisted.sid = 'S-1-16-0' THEN
'S-1-16-0 (Untrusted Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-12288' THEN
'S-1-16-12288 (High Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-16384' THEN
'S-1-16-16384 (System Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-20480' THEN
'S-1-16-20480 (Protected Process Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-28672' THEN
'S-1-16-28672 (Secure Process Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-4096' THEN
'S-1-16-4096 (Low Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-8192' THEN
'S-1-16-8192 (Medium Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-8448' THEN
'S-1-16-8448 (Medium Plus Mandatory Level)'
WHEN events_persisted.sid = 'S-1-2' THEN
'S-1-2 (Local Authority)'
WHEN events_persisted.sid = 'S-1-2-0' THEN
'S-1-2-0 (Local)'
WHEN events_persisted.sid = 'S-1-2-1' THEN
'S-1-2-1 (Console Logon)'
WHEN events_persisted.sid = 'S-1-3' THEN
'S-1-3 (Creator Authority)'
WHEN events_persisted.sid = 'S-1-3-0' THEN
'S-1-3-0 (Creator Owner)'
WHEN events_persisted.sid = 'S-1-3-1' THEN
'S-1-3-1 (Creator Group)'
WHEN events_persisted.sid = 'S-1-3-2' THEN
'S-1-3-2 (Creator Owner Server)'
WHEN events_persisted.sid = 'S-1-3-3' THEN
'S-1-3-3 (Creator Group Server)'
WHEN events_persisted.sid = 'S-1-3-4' THEN
'S-1-3-4 (Owner Rights)'
WHEN events_persisted.sid = 'S-1-4' THEN
'S-1-4 (Non-unique Authority)'
WHEN events_persisted.sid = 'S-1-5' THEN
'S-1-5 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-1' THEN
'S-1-5-1 (Dialup)'
WHEN events_persisted.sid = 'S-1-5-10' THEN
'S-1-5-10 (Principal Self)'
WHEN events_persisted.sid = 'S-1-5-11' THEN
'S-1-5-11 (Authenticated Users)'
WHEN events_persisted.sid = 'S-1-5-12' THEN
'S-1-5-12 (Restricted Code)'
WHEN events_persisted.sid = 'S-1-5-13' THEN
'S-1-5-13 (Terminal Server Users)'
WHEN events_persisted.sid = 'S-1-5-14' THEN
'S-1-5-14 (Remote Interactive Logon)'
WHEN events_persisted.sid = 'S-1-5-15' THEN
'S-1-5-15 (This Organization)'
WHEN events_persisted.sid = 'S-1-5-17' THEN
'S-1-5-17 (IUSR)'
WHEN events_persisted.sid = 'S-1-5-18' THEN
'S-1-5-18 (Local System)'
WHEN events_persisted.sid = 'S-1-5-19' THEN
'S-1-5-19 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-2' THEN
'S-1-5-2 (Network)'
WHEN events_persisted.sid = 'S-1-5-20' THEN
'S-1-5-20 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-21domain-498' THEN
'S-1-5-21domain-498 (Enterprise Read-only Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-521' THEN
'S-1-5-21domain-521 (Read-only Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-571' THEN
'S-1-5-21domain-571 (Allowed RODC Password Replication Group)'
WHEN events_persisted.sid = 'S-1-5-21domain-572' THEN
'S-1-5-21domain-572 (Denied RODC Password Replication Group)'
WHEN events_persisted.sid = 'S-1-5-21domain-500' THEN
'S-1-5-21domain-500 (Administrator)'
WHEN events_persisted.sid = 'S-1-5-21domain-501' THEN
'S-1-5-21domain-501 (Guest)'
WHEN events_persisted.sid = 'S-1-5-21domain-502' THEN
'S-1-5-21domain-502 (KRBTGT)'
WHEN events_persisted.sid = 'S-1-5-21domain-512' THEN
'S-1-5-21domain-512 (Domain Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-513' THEN
'S-1-5-21domain-513 (Domain Users)'
WHEN events_persisted.sid = 'S-1-5-21domain-514' THEN
'S-1-5-21domain-514 (Domain Guests)'
WHEN events_persisted.sid = 'S-1-5-21domain-515' THEN
'S-1-5-21domain-515 (Domain Computers)'
WHEN events_persisted.sid = 'S-1-5-21domain-516' THEN
'S-1-5-21domain-516 (Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-517' THEN
'S-1-5-21domain-517 (Cert Publishers)'
WHEN events_persisted.sid = 'S-1-5-21domain-520' THEN
'S-1-5-21domain-520 (Group Policy Creator Owners)'
WHEN events_persisted.sid = 'S-1-5-21-domain-522' THEN
'S-1-5-21-domain-522 (Cloneable Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-526' THEN
'S-1-5-21domain-526 (Key Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-527' THEN
'S-1-5-21domain-527 (Enterprise Key Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-553' THEN
'S-1-5-21domain-553 (RAS and IAS Servers)'
WHEN events_persisted.sid = 'S-1-5-21root domain-518' THEN
'S-1-5-21root domain-518 (Schema Admins)'
WHEN events_persisted.sid = 'S-1-5-21root domain-519' THEN
'S-1-5-21root domain-519 (Enterprise Admins)'
WHEN events_persisted.sid = 'S-1-5-3' THEN
'S-1-5-3 (Batch)'
WHEN events_persisted.sid = 'S-1-5-32-544' THEN
'S-1-5-32-544 (Administrators)'
WHEN events_persisted.sid = 'S-1-5-32-545' THEN
'S-1-5-32-545 (Users)'
WHEN events_persisted.sid = 'S-1-5-32-546' THEN
'S-1-5-32-546 (Guests)'
WHEN events_persisted.sid = 'S-1-5-32-547' THEN
'S-1-5-32-547 (Power Users)'
WHEN events_persisted.sid = 'S-1-5-32-548' THEN
'S-1-5-32-548 (Account Operators)'
WHEN events_persisted.sid = 'S-1-5-32-549' THEN
'S-1-5-32-549 (Server Operators)'
WHEN events_persisted.sid = 'S-1-5-32-550' THEN
'S-1-5-32-550 (Print Operators)'
WHEN events_persisted.sid = 'S-1-5-32-551' THEN
'S-1-5-32-551 (Backup Operators)'
WHEN events_persisted.sid = 'S-1-5-32-552' THEN
'S-1-5-32-552 (Replicators)'
WHEN events_persisted.sid = 'S-1-5-32-554' THEN
'S-1-5-32-554 (Builtin\\Pre-Windows 2000 Compatible Access)'
WHEN events_persisted.sid = 'S-1-5-32-555' THEN
'S-1-5-32-555 (Builtin\\Remote Desktop Users)'
WHEN events_persisted.sid = 'S-1-5-32-556' THEN
'S-1-5-32-556 (Builtin\\Network Configuration Operators)'
WHEN events_persisted.sid = 'S-1-5-32-557' THEN
'S-1-5-32-557 (Builtin\\Incoming Forest Trust Builders)'
WHEN events_persisted.sid = 'S-1-5-32-558' THEN
'S-1-5-32-558 (Builtin\\Performance Monitor Users)'
WHEN events_persisted.sid = 'S-1-5-32-559' THEN
'S-1-5-32-559 (Builtin\\Performance Log Users)'
WHEN events_persisted.sid = 'S-1-5-32-560' THEN
'S-1-5-32-560 (Builtin\\Windows Authorization Access Group)'
WHEN events_persisted.sid = 'S-1-5-32-561' THEN
'S-1-5-32-561 (Builtin\\Terminal Server License Servers)'
WHEN events_persisted.sid = 'S-1-5-32-562' THEN
'S-1-5-32-562 (Builtin\\Distributed COM Users)'
WHEN events_persisted.sid = 'S-1-5-32-569' THEN
'S-1-5-32-569 (Builtin\\Cryptographic Operators)'
WHEN events_persisted.sid = 'S-1-5-32-573' THEN
'S-1-5-32-573 (Builtin\\Event Log Readers)'
WHEN events_persisted.sid = 'S-1-5-32-574' THEN
'S-1-5-32-574 (Builtin\\Certificate Service DCOM Access)'
WHEN events_persisted.sid = 'S-1-5-32-575' THEN
'S-1-5-32-575 (Builtin\\RDS Remote Access Servers)'
WHEN events_persisted.sid = 'S-1-5-32-576' THEN
'S-1-5-32-576 (Builtin\\RDS Endpoint Servers)'
WHEN events_persisted.sid = 'S-1-5-32-577' THEN
'S-1-5-32-577 (Builtin\\RDS Management Servers)'
WHEN events_persisted.sid = 'S-1-5-32-578' THEN
'S-1-5-32-578 (Builtin\\Hyper-V Administrators)'
WHEN events_persisted.sid = 'S-1-5-32-579' THEN
'S-1-5-32-579 (Builtin\\Access Control Assistance Operators)'
WHEN events_persisted.sid = 'S-1-5-32-580' THEN
'S-1-5-32-580 (Builtin\\Remote Management Users)'
WHEN events_persisted.sid = 'S-1-5-32-582' THEN
'S-1-5-32-582 (Storage Replica Administrators)'
WHEN events_persisted.sid = 'S-1-5-4' THEN
'S-1-5-4 (Interactive)'
WHEN events_persisted.sid = 'S-1-5-5-X-Y' THEN
'S-1-5-5-X-Y (Logon Session)'
WHEN events_persisted.sid = 'S-1-5-6' THEN
'S-1-5-6 (Service)'
WHEN events_persisted.sid = 'S-1-5-64-10' THEN
'S-1-5-64-10 (NTLM Authentication)'
WHEN events_persisted.sid = 'S-1-5-64-14' THEN
'S-1-5-64-14 (SChannelAuthentication)'
WHEN events_persisted.sid = 'S-1-5-64-21' THEN
'S-1-5-64-21 (Digest Authentication)'
WHEN events_persisted.sid = 'S-1-5-7' THEN
'S-1-5-7 (Anonymous)'
WHEN events_persisted.sid = 'S-1-5-8' THEN
'S-1-5-8 (Proxy)'
WHEN events_persisted.sid = 'S-1-5-80' THEN
'S-1-5-80 (NT Service)'
WHEN events_persisted.sid = 'S-1-5-80-0' THEN
'S-1-5-80-0 (NT Services\\All Services)'
WHEN events_persisted.sid = 'S-1-5-80-0' THEN
'S-1-5-80-0 (All Services)'
WHEN events_persisted.sid = 'S-1-5-83-0' THEN
'S-1-5-83-0 (NT Virtual Machine\\Virtual Machines)'
WHEN events_persisted.sid = 'S-1-5-9' THEN
'S-1-5-9 (Enterprise Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-90-0' THEN
'S-1-5-90-0 (Windows Manager\\Windows Manager Group)' ELSE events_persisted.sid
END AS UserSID,
datetime( ( events_persisted.timestamp / 10000000 ) - 11644473600, 'unixepoch' ) AS Timestamp,
tag_descriptions.locale_name AS LocaleName,
tag_descriptions.tag_name AS TagName,
events_persisted.full_event_name AS FullEventName,
events_persisted.logging_binary_name AS LoggingBinaryName,
events_persisted.friendly_logging_binary_name AS FriendlyLoggingBinaryName,
events_persisted.full_event_name_hash AS FullEventNameHash,
events_persisted.event_keywords AS Keywords,
provider_groups.group_guid AS GroupGUID,
CASE

WHEN events_persisted.is_core = 0 THEN
'No'
WHEN events_persisted.is_core = 1 THEN
'Yes' ELSE 'Unknown'
END AS IsCore,
events_persisted.compressed_payload_size AS CompressedPayloadSize,
events_persisted.payload AS JSONPayload
FROM
events_persisted
LEFT JOIN event_tags ON events_persisted.full_event_name_hash = event_tags.full_event_name_hash
LEFT JOIN tag_descriptions ON event_tags.tag_id = tag_descriptions.tag_id
LEFT JOIN provider_groups ON events_persisted.provider_group_id = provider_groups.group_id
WHERE
TagName = 'Inking Typing and Speech Utterance'
ORDER BY
events_persisted.timestamp ASC
`,baseFileName:`EventTranscriptDB_InkingTypingandSpeechUtterance_NoDataSampling`,blobColumns:[]},{name:`Windows EventTranscript.db_ProductandServicePerformance`,query:`SELECT
CASE

WHEN
events_persisted.sid = 'S-1-0' THEN
'S-1-0 (Null Authority)'
WHEN events_persisted.sid = 'S-1-0-0' THEN
'S-1-0-0 (Nobody)'
WHEN events_persisted.sid = 'S-1-1' THEN
'S-1-1 (World Authority)'
WHEN events_persisted.sid = 'S-1-1-0' THEN
'S-1-1-0 (Everyone)'
WHEN events_persisted.sid = 'S-1-16-0' THEN
'S-1-16-0 (Untrusted Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-12288' THEN
'S-1-16-12288 (High Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-16384' THEN
'S-1-16-16384 (System Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-20480' THEN
'S-1-16-20480 (Protected Process Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-28672' THEN
'S-1-16-28672 (Secure Process Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-4096' THEN
'S-1-16-4096 (Low Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-8192' THEN
'S-1-16-8192 (Medium Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-8448' THEN
'S-1-16-8448 (Medium Plus Mandatory Level)'
WHEN events_persisted.sid = 'S-1-2' THEN
'S-1-2 (Local Authority)'
WHEN events_persisted.sid = 'S-1-2-0' THEN
'S-1-2-0 (Local)'
WHEN events_persisted.sid = 'S-1-2-1' THEN
'S-1-2-1 (Console Logon)'
WHEN events_persisted.sid = 'S-1-3' THEN
'S-1-3 (Creator Authority)'
WHEN events_persisted.sid = 'S-1-3-0' THEN
'S-1-3-0 (Creator Owner)'
WHEN events_persisted.sid = 'S-1-3-1' THEN
'S-1-3-1 (Creator Group)'
WHEN events_persisted.sid = 'S-1-3-2' THEN
'S-1-3-2 (Creator Owner Server)'
WHEN events_persisted.sid = 'S-1-3-3' THEN
'S-1-3-3 (Creator Group Server)'
WHEN events_persisted.sid = 'S-1-3-4' THEN
'S-1-3-4 (Owner Rights)'
WHEN events_persisted.sid = 'S-1-4' THEN
'S-1-4 (Non-unique Authority)'
WHEN events_persisted.sid = 'S-1-5' THEN
'S-1-5 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-1' THEN
'S-1-5-1 (Dialup)'
WHEN events_persisted.sid = 'S-1-5-10' THEN
'S-1-5-10 (Principal Self)'
WHEN events_persisted.sid = 'S-1-5-11' THEN
'S-1-5-11 (Authenticated Users)'
WHEN events_persisted.sid = 'S-1-5-12' THEN
'S-1-5-12 (Restricted Code)'
WHEN events_persisted.sid = 'S-1-5-13' THEN
'S-1-5-13 (Terminal Server Users)'
WHEN events_persisted.sid = 'S-1-5-14' THEN
'S-1-5-14 (Remote Interactive Logon)'
WHEN events_persisted.sid = 'S-1-5-15' THEN
'S-1-5-15 (This Organization)'
WHEN events_persisted.sid = 'S-1-5-17' THEN
'S-1-5-17 (IUSR)'
WHEN events_persisted.sid = 'S-1-5-18' THEN
'S-1-5-18 (Local System)'
WHEN events_persisted.sid = 'S-1-5-19' THEN
'S-1-5-19 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-2' THEN
'S-1-5-2 (Network)'
WHEN events_persisted.sid = 'S-1-5-20' THEN
'S-1-5-20 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-21domain-498' THEN
'S-1-5-21domain-498 (Enterprise Read-only Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-521' THEN
'S-1-5-21domain-521 (Read-only Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-571' THEN
'S-1-5-21domain-571 (Allowed RODC Password Replication Group)'
WHEN events_persisted.sid = 'S-1-5-21domain-572' THEN
'S-1-5-21domain-572 (Denied RODC Password Replication Group)'
WHEN events_persisted.sid = 'S-1-5-21domain-500' THEN
'S-1-5-21domain-500 (Administrator)'
WHEN events_persisted.sid = 'S-1-5-21domain-501' THEN
'S-1-5-21domain-501 (Guest)'
WHEN events_persisted.sid = 'S-1-5-21domain-502' THEN
'S-1-5-21domain-502 (KRBTGT)'
WHEN events_persisted.sid = 'S-1-5-21domain-512' THEN
'S-1-5-21domain-512 (Domain Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-513' THEN
'S-1-5-21domain-513 (Domain Users)'
WHEN events_persisted.sid = 'S-1-5-21domain-514' THEN
'S-1-5-21domain-514 (Domain Guests)'
WHEN events_persisted.sid = 'S-1-5-21domain-515' THEN
'S-1-5-21domain-515 (Domain Computers)'
WHEN events_persisted.sid = 'S-1-5-21domain-516' THEN
'S-1-5-21domain-516 (Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-517' THEN
'S-1-5-21domain-517 (Cert Publishers)'
WHEN events_persisted.sid = 'S-1-5-21domain-520' THEN
'S-1-5-21domain-520 (Group Policy Creator Owners)'
WHEN events_persisted.sid = 'S-1-5-21-domain-522' THEN
'S-1-5-21-domain-522 (Cloneable Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-526' THEN
'S-1-5-21domain-526 (Key Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-527' THEN
'S-1-5-21domain-527 (Enterprise Key Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-553' THEN
'S-1-5-21domain-553 (RAS and IAS Servers)'
WHEN events_persisted.sid = 'S-1-5-21root domain-518' THEN
'S-1-5-21root domain-518 (Schema Admins)'
WHEN events_persisted.sid = 'S-1-5-21root domain-519' THEN
'S-1-5-21root domain-519 (Enterprise Admins)'
WHEN events_persisted.sid = 'S-1-5-3' THEN
'S-1-5-3 (Batch)'
WHEN events_persisted.sid = 'S-1-5-32-544' THEN
'S-1-5-32-544 (Administrators)'
WHEN events_persisted.sid = 'S-1-5-32-545' THEN
'S-1-5-32-545 (Users)'
WHEN events_persisted.sid = 'S-1-5-32-546' THEN
'S-1-5-32-546 (Guests)'
WHEN events_persisted.sid = 'S-1-5-32-547' THEN
'S-1-5-32-547 (Power Users)'
WHEN events_persisted.sid = 'S-1-5-32-548' THEN
'S-1-5-32-548 (Account Operators)'
WHEN events_persisted.sid = 'S-1-5-32-549' THEN
'S-1-5-32-549 (Server Operators)'
WHEN events_persisted.sid = 'S-1-5-32-550' THEN
'S-1-5-32-550 (Print Operators)'
WHEN events_persisted.sid = 'S-1-5-32-551' THEN
'S-1-5-32-551 (Backup Operators)'
WHEN events_persisted.sid = 'S-1-5-32-552' THEN
'S-1-5-32-552 (Replicators)'
WHEN events_persisted.sid = 'S-1-5-32-554' THEN
'S-1-5-32-554 (Builtin\\Pre-Windows 2000 Compatible Access)'
WHEN events_persisted.sid = 'S-1-5-32-555' THEN
'S-1-5-32-555 (Builtin\\Remote Desktop Users)'
WHEN events_persisted.sid = 'S-1-5-32-556' THEN
'S-1-5-32-556 (Builtin\\Network Configuration Operators)'
WHEN events_persisted.sid = 'S-1-5-32-557' THEN
'S-1-5-32-557 (Builtin\\Incoming Forest Trust Builders)'
WHEN events_persisted.sid = 'S-1-5-32-558' THEN
'S-1-5-32-558 (Builtin\\Performance Monitor Users)'
WHEN events_persisted.sid = 'S-1-5-32-559' THEN
'S-1-5-32-559 (Builtin\\Performance Log Users)'
WHEN events_persisted.sid = 'S-1-5-32-560' THEN
'S-1-5-32-560 (Builtin\\Windows Authorization Access Group)'
WHEN events_persisted.sid = 'S-1-5-32-561' THEN
'S-1-5-32-561 (Builtin\\Terminal Server License Servers)'
WHEN events_persisted.sid = 'S-1-5-32-562' THEN
'S-1-5-32-562 (Builtin\\Distributed COM Users)'
WHEN events_persisted.sid = 'S-1-5-32-569' THEN
'S-1-5-32-569 (Builtin\\Cryptographic Operators)'
WHEN events_persisted.sid = 'S-1-5-32-573' THEN
'S-1-5-32-573 (Builtin\\Event Log Readers)'
WHEN events_persisted.sid = 'S-1-5-32-574' THEN
'S-1-5-32-574 (Builtin\\Certificate Service DCOM Access)'
WHEN events_persisted.sid = 'S-1-5-32-575' THEN
'S-1-5-32-575 (Builtin\\RDS Remote Access Servers)'
WHEN events_persisted.sid = 'S-1-5-32-576' THEN
'S-1-5-32-576 (Builtin\\RDS Endpoint Servers)'
WHEN events_persisted.sid = 'S-1-5-32-577' THEN
'S-1-5-32-577 (Builtin\\RDS Management Servers)'
WHEN events_persisted.sid = 'S-1-5-32-578' THEN
'S-1-5-32-578 (Builtin\\Hyper-V Administrators)'
WHEN events_persisted.sid = 'S-1-5-32-579' THEN
'S-1-5-32-579 (Builtin\\Access Control Assistance Operators)'
WHEN events_persisted.sid = 'S-1-5-32-580' THEN
'S-1-5-32-580 (Builtin\\Remote Management Users)'
WHEN events_persisted.sid = 'S-1-5-32-582' THEN
'S-1-5-32-582 (Storage Replica Administrators)'
WHEN events_persisted.sid = 'S-1-5-4' THEN
'S-1-5-4 (Interactive)'
WHEN events_persisted.sid = 'S-1-5-5-X-Y' THEN
'S-1-5-5-X-Y (Logon Session)'
WHEN events_persisted.sid = 'S-1-5-6' THEN
'S-1-5-6 (Service)'
WHEN events_persisted.sid = 'S-1-5-64-10' THEN
'S-1-5-64-10 (NTLM Authentication)'
WHEN events_persisted.sid = 'S-1-5-64-14' THEN
'S-1-5-64-14 (SChannelAuthentication)'
WHEN events_persisted.sid = 'S-1-5-64-21' THEN
'S-1-5-64-21 (Digest Authentication)'
WHEN events_persisted.sid = 'S-1-5-7' THEN
'S-1-5-7 (Anonymous)'
WHEN events_persisted.sid = 'S-1-5-8' THEN
'S-1-5-8 (Proxy)'
WHEN events_persisted.sid = 'S-1-5-80' THEN
'S-1-5-80 (NT Service)'
WHEN events_persisted.sid = 'S-1-5-80-0' THEN
'S-1-5-80-0 (NT Services\\All Services)'
WHEN events_persisted.sid = 'S-1-5-80-0' THEN
'S-1-5-80-0 (All Services)'
WHEN events_persisted.sid = 'S-1-5-83-0' THEN
'S-1-5-83-0 (NT Virtual Machine\\Virtual Machines)'
WHEN events_persisted.sid = 'S-1-5-9' THEN
'S-1-5-9 (Enterprise Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-90-0' THEN
'S-1-5-90-0 (Windows Manager\\Windows Manager Group)' ELSE events_persisted.sid
END AS UserSID,
datetime( ( events_persisted.timestamp / 10000000 ) - 11644473600, 'unixepoch' ) AS Timestamp,
tag_descriptions.locale_name AS LocaleName,
tag_descriptions.tag_name AS TagName,
events_persisted.full_event_name AS FullEventName,
events_persisted.logging_binary_name AS LoggingBinaryName,
events_persisted.friendly_logging_binary_name AS FriendlyLoggingBinaryName,
events_persisted.full_event_name_hash AS FullEventNameHash,
events_persisted.event_keywords AS Keywords,
provider_groups.group_guid AS GroupGUID,
CASE

WHEN events_persisted.is_core = 0 THEN
'No'
WHEN events_persisted.is_core = 1 THEN
'Yes' ELSE 'Unknown'
END AS IsCore,
events_persisted.compressed_payload_size AS CompressedPayloadSize,
events_persisted.payload AS JSONPayload
FROM
events_persisted
LEFT JOIN event_tags ON events_persisted.full_event_name_hash = event_tags.full_event_name_hash
LEFT JOIN tag_descriptions ON event_tags.tag_id = tag_descriptions.tag_id
LEFT JOIN provider_groups ON events_persisted.provider_group_id = provider_groups.group_id
WHERE
TagName = 'Product and Service Performance'
ORDER BY
events_persisted.timestamp ASC
`,baseFileName:`EventTranscriptDB_ProductandServicePerformance_NoDataSampling`,blobColumns:[]},{name:`Windows EventTranscript.db Product and Service Usage`,query:`SELECT
CASE

WHEN
events_persisted.sid = 'S-1-0' THEN
'S-1-0 (Null Authority)'
WHEN events_persisted.sid = 'S-1-0-0' THEN
'S-1-0-0 (Nobody)'
WHEN events_persisted.sid = 'S-1-1' THEN
'S-1-1 (World Authority)'
WHEN events_persisted.sid = 'S-1-1-0' THEN
'S-1-1-0 (Everyone)'
WHEN events_persisted.sid = 'S-1-16-0' THEN
'S-1-16-0 (Untrusted Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-12288' THEN
'S-1-16-12288 (High Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-16384' THEN
'S-1-16-16384 (System Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-20480' THEN
'S-1-16-20480 (Protected Process Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-28672' THEN
'S-1-16-28672 (Secure Process Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-4096' THEN
'S-1-16-4096 (Low Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-8192' THEN
'S-1-16-8192 (Medium Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-8448' THEN
'S-1-16-8448 (Medium Plus Mandatory Level)'
WHEN events_persisted.sid = 'S-1-2' THEN
'S-1-2 (Local Authority)'
WHEN events_persisted.sid = 'S-1-2-0' THEN
'S-1-2-0 (Local)'
WHEN events_persisted.sid = 'S-1-2-1' THEN
'S-1-2-1 (Console Logon)'
WHEN events_persisted.sid = 'S-1-3' THEN
'S-1-3 (Creator Authority)'
WHEN events_persisted.sid = 'S-1-3-0' THEN
'S-1-3-0 (Creator Owner)'
WHEN events_persisted.sid = 'S-1-3-1' THEN
'S-1-3-1 (Creator Group)'
WHEN events_persisted.sid = 'S-1-3-2' THEN
'S-1-3-2 (Creator Owner Server)'
WHEN events_persisted.sid = 'S-1-3-3' THEN
'S-1-3-3 (Creator Group Server)'
WHEN events_persisted.sid = 'S-1-3-4' THEN
'S-1-3-4 (Owner Rights)'
WHEN events_persisted.sid = 'S-1-4' THEN
'S-1-4 (Non-unique Authority)'
WHEN events_persisted.sid = 'S-1-5' THEN
'S-1-5 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-1' THEN
'S-1-5-1 (Dialup)'
WHEN events_persisted.sid = 'S-1-5-10' THEN
'S-1-5-10 (Principal Self)'
WHEN events_persisted.sid = 'S-1-5-11' THEN
'S-1-5-11 (Authenticated Users)'
WHEN events_persisted.sid = 'S-1-5-12' THEN
'S-1-5-12 (Restricted Code)'
WHEN events_persisted.sid = 'S-1-5-13' THEN
'S-1-5-13 (Terminal Server Users)'
WHEN events_persisted.sid = 'S-1-5-14' THEN
'S-1-5-14 (Remote Interactive Logon)'
WHEN events_persisted.sid = 'S-1-5-15' THEN
'S-1-5-15 (This Organization)'
WHEN events_persisted.sid = 'S-1-5-17' THEN
'S-1-5-17 (IUSR)'
WHEN events_persisted.sid = 'S-1-5-18' THEN
'S-1-5-18 (Local System)'
WHEN events_persisted.sid = 'S-1-5-19' THEN
'S-1-5-19 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-2' THEN
'S-1-5-2 (Network)'
WHEN events_persisted.sid = 'S-1-5-20' THEN
'S-1-5-20 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-21domain-498' THEN
'S-1-5-21domain-498 (Enterprise Read-only Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-521' THEN
'S-1-5-21domain-521 (Read-only Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-571' THEN
'S-1-5-21domain-571 (Allowed RODC Password Replication Group)'
WHEN events_persisted.sid = 'S-1-5-21domain-572' THEN
'S-1-5-21domain-572 (Denied RODC Password Replication Group)'
WHEN events_persisted.sid = 'S-1-5-21domain-500' THEN
'S-1-5-21domain-500 (Administrator)'
WHEN events_persisted.sid = 'S-1-5-21domain-501' THEN
'S-1-5-21domain-501 (Guest)'
WHEN events_persisted.sid = 'S-1-5-21domain-502' THEN
'S-1-5-21domain-502 (KRBTGT)'
WHEN events_persisted.sid = 'S-1-5-21domain-512' THEN
'S-1-5-21domain-512 (Domain Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-513' THEN
'S-1-5-21domain-513 (Domain Users)'
WHEN events_persisted.sid = 'S-1-5-21domain-514' THEN
'S-1-5-21domain-514 (Domain Guests)'
WHEN events_persisted.sid = 'S-1-5-21domain-515' THEN
'S-1-5-21domain-515 (Domain Computers)'
WHEN events_persisted.sid = 'S-1-5-21domain-516' THEN
'S-1-5-21domain-516 (Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-517' THEN
'S-1-5-21domain-517 (Cert Publishers)'
WHEN events_persisted.sid = 'S-1-5-21domain-520' THEN
'S-1-5-21domain-520 (Group Policy Creator Owners)'
WHEN events_persisted.sid = 'S-1-5-21-domain-522' THEN
'S-1-5-21-domain-522 (Cloneable Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-526' THEN
'S-1-5-21domain-526 (Key Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-527' THEN
'S-1-5-21domain-527 (Enterprise Key Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-553' THEN
'S-1-5-21domain-553 (RAS and IAS Servers)'
WHEN events_persisted.sid = 'S-1-5-21root domain-518' THEN
'S-1-5-21root domain-518 (Schema Admins)'
WHEN events_persisted.sid = 'S-1-5-21root domain-519' THEN
'S-1-5-21root domain-519 (Enterprise Admins)'
WHEN events_persisted.sid = 'S-1-5-3' THEN
'S-1-5-3 (Batch)'
WHEN events_persisted.sid = 'S-1-5-32-544' THEN
'S-1-5-32-544 (Administrators)'
WHEN events_persisted.sid = 'S-1-5-32-545' THEN
'S-1-5-32-545 (Users)'
WHEN events_persisted.sid = 'S-1-5-32-546' THEN
'S-1-5-32-546 (Guests)'
WHEN events_persisted.sid = 'S-1-5-32-547' THEN
'S-1-5-32-547 (Power Users)'
WHEN events_persisted.sid = 'S-1-5-32-548' THEN
'S-1-5-32-548 (Account Operators)'
WHEN events_persisted.sid = 'S-1-5-32-549' THEN
'S-1-5-32-549 (Server Operators)'
WHEN events_persisted.sid = 'S-1-5-32-550' THEN
'S-1-5-32-550 (Print Operators)'
WHEN events_persisted.sid = 'S-1-5-32-551' THEN
'S-1-5-32-551 (Backup Operators)'
WHEN events_persisted.sid = 'S-1-5-32-552' THEN
'S-1-5-32-552 (Replicators)'
WHEN events_persisted.sid = 'S-1-5-32-554' THEN
'S-1-5-32-554 (Builtin\\Pre-Windows 2000 Compatible Access)'
WHEN events_persisted.sid = 'S-1-5-32-555' THEN
'S-1-5-32-555 (Builtin\\Remote Desktop Users)'
WHEN events_persisted.sid = 'S-1-5-32-556' THEN
'S-1-5-32-556 (Builtin\\Network Configuration Operators)'
WHEN events_persisted.sid = 'S-1-5-32-557' THEN
'S-1-5-32-557 (Builtin\\Incoming Forest Trust Builders)'
WHEN events_persisted.sid = 'S-1-5-32-558' THEN
'S-1-5-32-558 (Builtin\\Performance Monitor Users)'
WHEN events_persisted.sid = 'S-1-5-32-559' THEN
'S-1-5-32-559 (Builtin\\Performance Log Users)'
WHEN events_persisted.sid = 'S-1-5-32-560' THEN
'S-1-5-32-560 (Builtin\\Windows Authorization Access Group)'
WHEN events_persisted.sid = 'S-1-5-32-561' THEN
'S-1-5-32-561 (Builtin\\Terminal Server License Servers)'
WHEN events_persisted.sid = 'S-1-5-32-562' THEN
'S-1-5-32-562 (Builtin\\Distributed COM Users)'
WHEN events_persisted.sid = 'S-1-5-32-569' THEN
'S-1-5-32-569 (Builtin\\Cryptographic Operators)'
WHEN events_persisted.sid = 'S-1-5-32-573' THEN
'S-1-5-32-573 (Builtin\\Event Log Readers)'
WHEN events_persisted.sid = 'S-1-5-32-574' THEN
'S-1-5-32-574 (Builtin\\Certificate Service DCOM Access)'
WHEN events_persisted.sid = 'S-1-5-32-575' THEN
'S-1-5-32-575 (Builtin\\RDS Remote Access Servers)'
WHEN events_persisted.sid = 'S-1-5-32-576' THEN
'S-1-5-32-576 (Builtin\\RDS Endpoint Servers)'
WHEN events_persisted.sid = 'S-1-5-32-577' THEN
'S-1-5-32-577 (Builtin\\RDS Management Servers)'
WHEN events_persisted.sid = 'S-1-5-32-578' THEN
'S-1-5-32-578 (Builtin\\Hyper-V Administrators)'
WHEN events_persisted.sid = 'S-1-5-32-579' THEN
'S-1-5-32-579 (Builtin\\Access Control Assistance Operators)'
WHEN events_persisted.sid = 'S-1-5-32-580' THEN
'S-1-5-32-580 (Builtin\\Remote Management Users)'
WHEN events_persisted.sid = 'S-1-5-32-582' THEN
'S-1-5-32-582 (Storage Replica Administrators)'
WHEN events_persisted.sid = 'S-1-5-4' THEN
'S-1-5-4 (Interactive)'
WHEN events_persisted.sid = 'S-1-5-5-X-Y' THEN
'S-1-5-5-X-Y (Logon Session)'
WHEN events_persisted.sid = 'S-1-5-6' THEN
'S-1-5-6 (Service)'
WHEN events_persisted.sid = 'S-1-5-64-10' THEN
'S-1-5-64-10 (NTLM Authentication)'
WHEN events_persisted.sid = 'S-1-5-64-14' THEN
'S-1-5-64-14 (SChannelAuthentication)'
WHEN events_persisted.sid = 'S-1-5-64-21' THEN
'S-1-5-64-21 (Digest Authentication)'
WHEN events_persisted.sid = 'S-1-5-7' THEN
'S-1-5-7 (Anonymous)'
WHEN events_persisted.sid = 'S-1-5-8' THEN
'S-1-5-8 (Proxy)'
WHEN events_persisted.sid = 'S-1-5-80' THEN
'S-1-5-80 (NT Service)'
WHEN events_persisted.sid = 'S-1-5-80-0' THEN
'S-1-5-80-0 (NT Services\\All Services)'
WHEN events_persisted.sid = 'S-1-5-80-0' THEN
'S-1-5-80-0 (All Services)'
WHEN events_persisted.sid = 'S-1-5-83-0' THEN
'S-1-5-83-0 (NT Virtual Machine\\Virtual Machines)'
WHEN events_persisted.sid = 'S-1-5-9' THEN
'S-1-5-9 (Enterprise Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-90-0' THEN
'S-1-5-90-0 (Windows Manager\\Windows Manager Group)' ELSE events_persisted.sid
END AS UserSID,
datetime( ( events_persisted.timestamp / 10000000 ) - 11644473600, 'unixepoch' ) AS Timestamp,
tag_descriptions.locale_name AS LocaleName,
tag_descriptions.tag_name AS TagName,
events_persisted.full_event_name AS FullEventName,
events_persisted.logging_binary_name AS LoggingBinaryName,
events_persisted.friendly_logging_binary_name AS FriendlyLoggingBinaryName,
events_persisted.full_event_name_hash AS FullEventNameHash,
events_persisted.event_keywords AS Keywords,
provider_groups.group_guid AS GroupGUID,
CASE

WHEN events_persisted.is_core = 0 THEN
'No'
WHEN events_persisted.is_core = 1 THEN
'Yes' ELSE 'Unknown'
END AS IsCore,
events_persisted.compressed_payload_size AS CompressedPayloadSize,
events_persisted.payload AS JSONPayload
FROM
events_persisted
LEFT JOIN event_tags ON events_persisted.full_event_name_hash = event_tags.full_event_name_hash
LEFT JOIN tag_descriptions ON event_tags.tag_id = tag_descriptions.tag_id
LEFT JOIN provider_groups ON events_persisted.provider_group_id = provider_groups.group_id
WHERE
TagName = 'Product and Service Usage'
ORDER BY
events_persisted.timestamp ASC
`,baseFileName:`EventTranscriptDB_ProductandServiceUsage_NoDataSampling`,blobColumns:[]},{name:`Windows EventTranscript.db Software Setup and Inventory`,query:`SELECT
CASE

WHEN
events_persisted.sid = 'S-1-0' THEN
'S-1-0 (Null Authority)'
WHEN events_persisted.sid = 'S-1-0-0' THEN
'S-1-0-0 (Nobody)'
WHEN events_persisted.sid = 'S-1-1' THEN
'S-1-1 (World Authority)'
WHEN events_persisted.sid = 'S-1-1-0' THEN
'S-1-1-0 (Everyone)'
WHEN events_persisted.sid = 'S-1-16-0' THEN
'S-1-16-0 (Untrusted Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-12288' THEN
'S-1-16-12288 (High Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-16384' THEN
'S-1-16-16384 (System Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-20480' THEN
'S-1-16-20480 (Protected Process Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-28672' THEN
'S-1-16-28672 (Secure Process Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-4096' THEN
'S-1-16-4096 (Low Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-8192' THEN
'S-1-16-8192 (Medium Mandatory Level)'
WHEN events_persisted.sid = 'S-1-16-8448' THEN
'S-1-16-8448 (Medium Plus Mandatory Level)'
WHEN events_persisted.sid = 'S-1-2' THEN
'S-1-2 (Local Authority)'
WHEN events_persisted.sid = 'S-1-2-0' THEN
'S-1-2-0 (Local)'
WHEN events_persisted.sid = 'S-1-2-1' THEN
'S-1-2-1 (Console Logon)'
WHEN events_persisted.sid = 'S-1-3' THEN
'S-1-3 (Creator Authority)'
WHEN events_persisted.sid = 'S-1-3-0' THEN
'S-1-3-0 (Creator Owner)'
WHEN events_persisted.sid = 'S-1-3-1' THEN
'S-1-3-1 (Creator Group)'
WHEN events_persisted.sid = 'S-1-3-2' THEN
'S-1-3-2 (Creator Owner Server)'
WHEN events_persisted.sid = 'S-1-3-3' THEN
'S-1-3-3 (Creator Group Server)'
WHEN events_persisted.sid = 'S-1-3-4' THEN
'S-1-3-4 (Owner Rights)'
WHEN events_persisted.sid = 'S-1-4' THEN
'S-1-4 (Non-unique Authority)'
WHEN events_persisted.sid = 'S-1-5' THEN
'S-1-5 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-1' THEN
'S-1-5-1 (Dialup)'
WHEN events_persisted.sid = 'S-1-5-10' THEN
'S-1-5-10 (Principal Self)'
WHEN events_persisted.sid = 'S-1-5-11' THEN
'S-1-5-11 (Authenticated Users)'
WHEN events_persisted.sid = 'S-1-5-12' THEN
'S-1-5-12 (Restricted Code)'
WHEN events_persisted.sid = 'S-1-5-13' THEN
'S-1-5-13 (Terminal Server Users)'
WHEN events_persisted.sid = 'S-1-5-14' THEN
'S-1-5-14 (Remote Interactive Logon)'
WHEN events_persisted.sid = 'S-1-5-15' THEN
'S-1-5-15 (This Organization)'
WHEN events_persisted.sid = 'S-1-5-17' THEN
'S-1-5-17 (IUSR)'
WHEN events_persisted.sid = 'S-1-5-18' THEN
'S-1-5-18 (Local System)'
WHEN events_persisted.sid = 'S-1-5-19' THEN
'S-1-5-19 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-2' THEN
'S-1-5-2 (Network)'
WHEN events_persisted.sid = 'S-1-5-20' THEN
'S-1-5-20 (NT Authority)'
WHEN events_persisted.sid = 'S-1-5-21domain-498' THEN
'S-1-5-21domain-498 (Enterprise Read-only Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-521' THEN
'S-1-5-21domain-521 (Read-only Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-571' THEN
'S-1-5-21domain-571 (Allowed RODC Password Replication Group)'
WHEN events_persisted.sid = 'S-1-5-21domain-572' THEN
'S-1-5-21domain-572 (Denied RODC Password Replication Group)'
WHEN events_persisted.sid = 'S-1-5-21domain-500' THEN
'S-1-5-21domain-500 (Administrator)'
WHEN events_persisted.sid = 'S-1-5-21domain-501' THEN
'S-1-5-21domain-501 (Guest)'
WHEN events_persisted.sid = 'S-1-5-21domain-502' THEN
'S-1-5-21domain-502 (KRBTGT)'
WHEN events_persisted.sid = 'S-1-5-21domain-512' THEN
'S-1-5-21domain-512 (Domain Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-513' THEN
'S-1-5-21domain-513 (Domain Users)'
WHEN events_persisted.sid = 'S-1-5-21domain-514' THEN
'S-1-5-21domain-514 (Domain Guests)'
WHEN events_persisted.sid = 'S-1-5-21domain-515' THEN
'S-1-5-21domain-515 (Domain Computers)'
WHEN events_persisted.sid = 'S-1-5-21domain-516' THEN
'S-1-5-21domain-516 (Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-517' THEN
'S-1-5-21domain-517 (Cert Publishers)'
WHEN events_persisted.sid = 'S-1-5-21domain-520' THEN
'S-1-5-21domain-520 (Group Policy Creator Owners)'
WHEN events_persisted.sid = 'S-1-5-21-domain-522' THEN
'S-1-5-21-domain-522 (Cloneable Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-21domain-526' THEN
'S-1-5-21domain-526 (Key Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-527' THEN
'S-1-5-21domain-527 (Enterprise Key Admins)'
WHEN events_persisted.sid = 'S-1-5-21domain-553' THEN
'S-1-5-21domain-553 (RAS and IAS Servers)'
WHEN events_persisted.sid = 'S-1-5-21root domain-518' THEN
'S-1-5-21root domain-518 (Schema Admins)'
WHEN events_persisted.sid = 'S-1-5-21root domain-519' THEN
'S-1-5-21root domain-519 (Enterprise Admins)'
WHEN events_persisted.sid = 'S-1-5-3' THEN
'S-1-5-3 (Batch)'
WHEN events_persisted.sid = 'S-1-5-32-544' THEN
'S-1-5-32-544 (Administrators)'
WHEN events_persisted.sid = 'S-1-5-32-545' THEN
'S-1-5-32-545 (Users)'
WHEN events_persisted.sid = 'S-1-5-32-546' THEN
'S-1-5-32-546 (Guests)'
WHEN events_persisted.sid = 'S-1-5-32-547' THEN
'S-1-5-32-547 (Power Users)'
WHEN events_persisted.sid = 'S-1-5-32-548' THEN
'S-1-5-32-548 (Account Operators)'
WHEN events_persisted.sid = 'S-1-5-32-549' THEN
'S-1-5-32-549 (Server Operators)'
WHEN events_persisted.sid = 'S-1-5-32-550' THEN
'S-1-5-32-550 (Print Operators)'
WHEN events_persisted.sid = 'S-1-5-32-551' THEN
'S-1-5-32-551 (Backup Operators)'
WHEN events_persisted.sid = 'S-1-5-32-552' THEN
'S-1-5-32-552 (Replicators)'
WHEN events_persisted.sid = 'S-1-5-32-554' THEN
'S-1-5-32-554 (Builtin\\Pre-Windows 2000 Compatible Access)'
WHEN events_persisted.sid = 'S-1-5-32-555' THEN
'S-1-5-32-555 (Builtin\\Remote Desktop Users)'
WHEN events_persisted.sid = 'S-1-5-32-556' THEN
'S-1-5-32-556 (Builtin\\Network Configuration Operators)'
WHEN events_persisted.sid = 'S-1-5-32-557' THEN
'S-1-5-32-557 (Builtin\\Incoming Forest Trust Builders)'
WHEN events_persisted.sid = 'S-1-5-32-558' THEN
'S-1-5-32-558 (Builtin\\Performance Monitor Users)'
WHEN events_persisted.sid = 'S-1-5-32-559' THEN
'S-1-5-32-559 (Builtin\\Performance Log Users)'
WHEN events_persisted.sid = 'S-1-5-32-560' THEN
'S-1-5-32-560 (Builtin\\Windows Authorization Access Group)'
WHEN events_persisted.sid = 'S-1-5-32-561' THEN
'S-1-5-32-561 (Builtin\\Terminal Server License Servers)'
WHEN events_persisted.sid = 'S-1-5-32-562' THEN
'S-1-5-32-562 (Builtin\\Distributed COM Users)'
WHEN events_persisted.sid = 'S-1-5-32-569' THEN
'S-1-5-32-569 (Builtin\\Cryptographic Operators)'
WHEN events_persisted.sid = 'S-1-5-32-573' THEN
'S-1-5-32-573 (Builtin\\Event Log Readers)'
WHEN events_persisted.sid = 'S-1-5-32-574' THEN
'S-1-5-32-574 (Builtin\\Certificate Service DCOM Access)'
WHEN events_persisted.sid = 'S-1-5-32-575' THEN
'S-1-5-32-575 (Builtin\\RDS Remote Access Servers)'
WHEN events_persisted.sid = 'S-1-5-32-576' THEN
'S-1-5-32-576 (Builtin\\RDS Endpoint Servers)'
WHEN events_persisted.sid = 'S-1-5-32-577' THEN
'S-1-5-32-577 (Builtin\\RDS Management Servers)'
WHEN events_persisted.sid = 'S-1-5-32-578' THEN
'S-1-5-32-578 (Builtin\\Hyper-V Administrators)'
WHEN events_persisted.sid = 'S-1-5-32-579' THEN
'S-1-5-32-579 (Builtin\\Access Control Assistance Operators)'
WHEN events_persisted.sid = 'S-1-5-32-580' THEN
'S-1-5-32-580 (Builtin\\Remote Management Users)'
WHEN events_persisted.sid = 'S-1-5-32-582' THEN
'S-1-5-32-582 (Storage Replica Administrators)'
WHEN events_persisted.sid = 'S-1-5-4' THEN
'S-1-5-4 (Interactive)'
WHEN events_persisted.sid = 'S-1-5-5-X-Y' THEN
'S-1-5-5-X-Y (Logon Session)'
WHEN events_persisted.sid = 'S-1-5-6' THEN
'S-1-5-6 (Service)'
WHEN events_persisted.sid = 'S-1-5-64-10' THEN
'S-1-5-64-10 (NTLM Authentication)'
WHEN events_persisted.sid = 'S-1-5-64-14' THEN
'S-1-5-64-14 (SChannelAuthentication)'
WHEN events_persisted.sid = 'S-1-5-64-21' THEN
'S-1-5-64-21 (Digest Authentication)'
WHEN events_persisted.sid = 'S-1-5-7' THEN
'S-1-5-7 (Anonymous)'
WHEN events_persisted.sid = 'S-1-5-8' THEN
'S-1-5-8 (Proxy)'
WHEN events_persisted.sid = 'S-1-5-80' THEN
'S-1-5-80 (NT Service)'
WHEN events_persisted.sid = 'S-1-5-80-0' THEN
'S-1-5-80-0 (NT Services\\All Services)'
WHEN events_persisted.sid = 'S-1-5-80-0' THEN
'S-1-5-80-0 (All Services)'
WHEN events_persisted.sid = 'S-1-5-83-0' THEN
'S-1-5-83-0 (NT Virtual Machine\\Virtual Machines)'
WHEN events_persisted.sid = 'S-1-5-9' THEN
'S-1-5-9 (Enterprise Domain Controllers)'
WHEN events_persisted.sid = 'S-1-5-90-0' THEN
'S-1-5-90-0 (Windows Manager\\Windows Manager Group)' ELSE events_persisted.sid
END AS UserSID,
datetime( ( events_persisted.timestamp / 10000000 ) - 11644473600, 'unixepoch' ) AS Timestamp,
tag_descriptions.locale_name AS LocaleName,
tag_descriptions.tag_name AS TagName,
events_persisted.full_event_name AS FullEventName,
events_persisted.logging_binary_name AS LoggingBinaryName,
events_persisted.friendly_logging_binary_name AS FriendlyLoggingBinaryName,
events_persisted.full_event_name_hash AS FullEventNameHash,
events_persisted.event_keywords AS Keywords,
provider_groups.group_guid AS GroupGUID,
CASE

WHEN events_persisted.is_core = 0 THEN
'No'
WHEN events_persisted.is_core = 1 THEN
'Yes' ELSE 'Unknown'
END AS IsCore,
events_persisted.compressed_payload_size AS CompressedPayloadSize,
events_persisted.payload AS JSONPayload
FROM
events_persisted
LEFT JOIN event_tags ON events_persisted.full_event_name_hash = event_tags.full_event_name_hash
LEFT JOIN tag_descriptions ON event_tags.tag_id = tag_descriptions.tag_id
LEFT JOIN provider_groups ON events_persisted.provider_group_id = provider_groups.group_id
WHERE
TagName = 'Software Setup and Inventory'
ORDER BY
events_persisted.timestamp ASC
`,baseFileName:`EventTranscriptDB_SoftwareSetupandInventory_NoDataSampling`,blobColumns:[]}]},{id:`1c3a5b1d-4284-4f47-8fcc-219bc5512acb`,description:`FastStone Database Tables`,csvPrefix:`FastStone`,fileName:`FSIV.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='FolderList' OR name='FileList' OR name='DBSettings');`,identifyValue:`3`,queries:[{name:`Folder List`,query:`SELECT
folderID AS FolderID,
folderName AS FolderName,
lastAccess AS LastAccess
FROM FolderList
`,baseFileName:`FolderList`,blobColumns:[]},{name:`File List`,query:`SELECT
ID AS ID,
folderID AS FolderID,
itemNO AS ItemNO,
isFolder AS IsFolder,
fileName AS FileName,
isTag AS IsTag,
ratings AS Ratings,
XP_rating AS XPRating,
fileTime AS FileTime,
exifTime AS ExifTime,
fileSize AS FileSize,
width AS Width,
height AS Height,
pages AS Pages,
imageType AS ImageType,
imgSize1 AS ImgSize1,
imgSize2 AS ImgSize2,
img1 AS Img1,
img2 AS Img2
FROM FileList
`,baseFileName:`FileList`,blobColumns:[]},{name:`DB Settings`,query:`SELECT
version AS Version,
ThumbnailSizeS AS ThumbnailSizeSmall,
ThumbnailSizeB AS ThumbnailSizeBig
FROM DBSettings
`,baseFileName:`DBSettings`,blobColumns:[]}]},{id:`dce0e3b5-afd0-41ca-b422-9e30e17abb4b`,description:`FileZilla Client Queue`,csvPrefix:`FileZilla`,fileName:`queue.sqlite3`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='files');`,identifyValue:`1`,queries:[{name:`FileZilla Client Queue`,query:`SELECT
 source_file,
 download,
 size,
 error_count,
 priority,
 l.path AS Local_Path,
 r.path AS Remote_Path,
 s.host as Remote_Server_IP,
 s.port as Remote_Server_Port,
 s.user as Remote_Server_User,
 s.password as Remote_Server_Password,
 s.account as Remote_Server_Account,
 s.name as Remote_Server_Name,
 s.parameters as Remote_Server_Parameters,
 s.site_path as Remote_Server_Site_Path
 FROM files f
 INNER JOIN servers s ON f.server = s.id
 INNER JOIN remote_paths r ON f.local_path = r.id
 INNER JOIN local_paths l ON f.remote_path = l.id
`,baseFileName:`ClientQueue`,blobColumns:[]}]},{id:`eda1fb9b-8275-4fb5-9ff2-ac557dc0d399`,description:`Firefox Bookmarks`,csvPrefix:`Firefox`,fileName:`places.sqlite`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='moz_historyvisits' OR name='moz_bookmarks' OR name='moz_places' OR name='moz_inputhistory');`,identifyValue:`4`,queries:[{name:`Bookmarks`,query:`SELECT
Bookmarks.id AS ID,
Bookmarks.parent AS ParentID,
CASE

WHEN Bookmarks.type = 1 THEN
'URL'
WHEN Bookmarks.type = 2 THEN
'Folder'
WHEN Bookmarks.type = 3 THEN
'Separator'
END AS Type,
datetime( Bookmarks.dateAdded / 1000000, 'unixepoch' ) AS DateAdded,
datetime( Bookmarks.lastModified / 1000000, 'unixepoch' ) AS LastModified,
Bookmarks.position AS Position,
Bookmarks.title AS Title,
moz_places.url AS URL,
Bookmarks.fk AS ForeignKey
FROM
moz_bookmarks AS Bookmarks
LEFT JOIN moz_places ON Bookmarks.fk = moz_places.id
ORDER BY
Bookmarks.id ASC
`,baseFileName:`Bookmarks`,blobColumns:[]}]},{id:`7be83590-8260-4c8a-9b75-c5f82290ebc2`,description:`Firefox Cookies`,csvPrefix:`Firefox`,fileName:`cookies.sqlite`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='moz_cookies');`,identifyValue:`1`,queries:[{name:`Firefox Cookies`,query:`SELECT
moz_cookies.id AS ID,
moz_cookies.host AS Host,
moz_cookies.name AS Name,
moz_cookies.value AS Value,
datetime( moz_cookies.creationTime / 1000000, 'UNIXEPOCH' ) AS "Creation Time",
datetime( moz_cookies.lastAccessed / 1000000, 'UNIXEPOCH' ) AS "Last Accessed Time",
datetime( moz_cookies.expiry, 'UNIXEPOCH' ) AS Expiration,
CASE

WHEN moz_cookies.isSecure = 0 THEN
'No'
WHEN moz_cookies.isSecure = 1 THEN
'Yes'
END AS IsSecure,
CASE

WHEN moz_cookies.isHttpOnly = 0 THEN
'No'
WHEN moz_cookies.isHttpOnly = 1 THEN
'Yes'
END AS IsHTTPOnly
FROM
moz_cookies
ORDER BY
moz_cookies.id ASC
`,baseFileName:`Cookies`,blobColumns:[]}]},{id:`163ac574-ab35-4509-b925-f8a14a470d4a`,description:`Firefox Downloads - downloads.sqlite`,csvPrefix:`Firefox`,fileName:`downloads.sqlite`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='moz_downloads');`,identifyValue:`1`,queries:[{name:`Firefox Downloads`,query:`SELECT
moz_downloads.id AS ID,
moz_downloads.name AS Name,
moz_downloads.mimeType AS MIMEType,
moz_downloads.source AS Source,
moz_downloads.target AS Target,
datetime( startTime / 1000000, 'unixepoch' ) AS StartTime,
datetime( endTime / 1000000, 'unixepoch' ) AS EndTime,
moz_downloads.currBytes AS CurrentBytes,
moz_downloads.maxBytes AS MaxBytes
FROM
moz_downloads
ORDER BY
moz_downloads.id ASC
`,baseFileName:`Downloads-DownloadsDB`,blobColumns:[]}]},{id:`f5d66594-1b5a-45f7-8cdf-57d76d646649`,description:`Firefox Downloads - Places.sqlite`,csvPrefix:`Firefox`,fileName:`places.sqlite`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='moz_historyvisits' OR name='moz_bookmarks' OR name='moz_places' OR name='moz_inputhistory');`,identifyValue:`4`,queries:[{name:`Firefox Downloads`,query:`SELECT
	moz_annos.place_id AS PlaceID,
	moz_places.url AS URL,
	moz_annos.content AS Content,
 CASE

 WHEN moz_anno_attributes.name = 'downloads/destinationFileURI' THEN
 'FileURI'
 WHEN moz_anno_attributes.name = 'downloads/destinationFileName' THEN
 'Filename'
 WHEN moz_anno_attributes.name = 'downloads/metaData' THEN
 'Metadata'
 END AS Type,
	datetime( dateAdded / 1000000, 'unixepoch' ) AS DateAdded,
	datetime( lastModified / 1000000, 'unixepoch' ) AS LastModified
FROM
	moz_annos
INNER JOIN
	moz_anno_attributes ON moz_annos.anno_attribute_id = moz_anno_attributes.id
INNER JOIN
	moz_places ON moz_places.id = moz_annos.place_id
WHERE
	moz_anno_attributes.name IN ('downloads/destinationFileURI','downloads/destinationFileName','downloads/metaData')
ORDER BY
	moz_annos.dateAdded ASC
`,baseFileName:`Downloads-PlacesDB`,blobColumns:[]}]},{id:`3242e11b-0575-4501-862f-265e2f3fccdf`,description:`Firefox Favicons`,csvPrefix:`Firefox`,fileName:`favicons.sqlite`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='moz_icons' OR name='moz_icons_to_pages' OR name='moz_pages_w_icons');`,identifyValue:`3`,queries:[{name:`Firefox Favicons`,query:`SELECT
moz_icons.id AS ID,
moz_pages_w_icons.page_url AS PageURL,
moz_icons.icon_url AS FaviconURL,
datetime( moz_icons.expire_ms / 1000, 'unixepoch' ) AS Expiration
FROM
moz_icons
INNER JOIN moz_icons_to_pages ON moz_icons.id = moz_icons_to_pages.icon_id
INNER JOIN moz_pages_w_icons ON moz_icons_to_pages.page_id = moz_pages_w_icons.id
ORDER BY
moz_icons.expire_ms ASC
`,baseFileName:`Favicons`,blobColumns:[]}]},{id:`928acef8-7035-45f2-b2a0-06613781c158`,description:`Firefox Form History database`,csvPrefix:`Firefox`,fileName:`formhistory.sqlite`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='moz_formhistory');`,identifyValue:`1`,queries:[{name:`Firefox Form History`,query:`SELECT
 id AS ID,
 fieldname AS FieldName,
 value AS Value,
 timesUsed AS TimesUsed,
 datetime( firstUsed / 1000000, 'unixepoch' ) AS "First Used",
 datetime( lastUsed / 1000000, 'unixepoch' ) AS "Last Used",
 guid AS GUID
FROM
 moz_formhistory
ORDER BY
 id ASC
`,baseFileName:`FormHistory`,blobColumns:[]}]},{id:`2f34be88-08d0-43c1-a2fd-60fe0b71f32b`,description:`Firefox History`,csvPrefix:`Firefox`,fileName:`places.sqlite`,identifyQuery:`SELECT (SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND (name='moz_historyvisits' OR name='moz_bookmarks' OR name='moz_places' OR name='moz_inputhistory')) + (SELECT CASE WHEN (SELECT COUNT(*) FROM pragma_table_info('moz_places') WHERE name IN ('description','preview_image_url')) > 1 THEN 1 ELSE 0 END);`,identifyValue:`5`,queries:[{name:`History`,query:`SELECT
moz_historyvisits.id AS VisitID,
moz_historyvisits.from_visit AS FromVisitID,
datetime( moz_historyvisits.visit_date / 1000000, 'unixepoch' ) AS VisitDate,
datetime( moz_places.last_visit_date / 1000000, 'unixepoch' ) AS LastVisitDate,
moz_places.visit_count AS VisitCount,
moz_places.url AS URL,
moz_places.title AS Title,
moz_places.description AS Description,
CASE

WHEN moz_historyvisits.visit_type = 1 THEN
'TRANSITION_LINK'
WHEN moz_historyvisits.visit_type = 2 THEN
'TRANSITION_TYPED'
WHEN moz_historyvisits.visit_type = 3 THEN
'TRANSITION_BOOKMARK'
WHEN moz_historyvisits.visit_type = 4 THEN
'TRANSITION_EMBED'
WHEN moz_historyvisits.visit_type = 5 THEN
'TRANSITION_REDIRECT_PERMANENT'
WHEN moz_historyvisits.visit_type = 6 THEN
'TRANSITION_REDIRECT_TEMPORARY'
WHEN moz_historyvisits.visit_type = 7 THEN
'TRANSITION_DOWNLOAD'
WHEN moz_historyvisits.visit_type = 8 THEN
'TRANSITION_FRAMED_LINK'
WHEN moz_historyvisits.visit_type = 9 THEN
'TRANSITION_RELOAD'
END AS VisitType,
CASE

WHEN moz_places.hidden = 0 THEN
'No'
WHEN moz_places.hidden = 1 THEN
'Yes'
END AS Hidden,
CASE

WHEN moz_places.typed = 0 THEN
'No'
WHEN moz_places.typed = 1 THEN
'Yes'
END AS Typed,
moz_places.frecency AS Frecency,
moz_places.preview_image_url AS PreviewImageURL
FROM
moz_places
INNER JOIN moz_historyvisits ON moz_places.id = moz_historyvisits.place_id
ORDER BY
moz_historyvisits.visit_date ASC
`,baseFileName:`History`,blobColumns:[]}]},{id:`e493912d-c5ea-47c7-b9d4-32f7e185931f`,description:`Firefox History Legacy`,csvPrefix:`Firefox`,fileName:`places.sqlite`,identifyQuery:`SELECT (SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND (name='moz_historyvisits' OR name='moz_bookmarks' OR name='moz_places' OR name='moz_inputhistory')) + (SELECT CASE WHEN (SELECT COUNT(*) FROM pragma_table_info('moz_places') WHERE name IN ('description','preview_image_url')) > 1 THEN 0 ELSE 1 END);`,identifyValue:`5`,queries:[{name:`History`,query:`SELECT
moz_historyvisits.id AS VisitID,
moz_historyvisits.from_visit AS FromVisitID,
datetime( moz_historyvisits.visit_date / 1000000, 'unixepoch' ) AS VisitDate,
datetime( moz_places.last_visit_date / 1000000, 'unixepoch' ) AS LastVisitDate,
moz_places.visit_count AS VisitCount,
moz_places.url AS URL,
moz_places.title AS Title,
CASE

WHEN moz_historyvisits.visit_type = 1 THEN
'TRANSITION_LINK'
WHEN moz_historyvisits.visit_type = 2 THEN
'TRANSITION_TYPED'
WHEN moz_historyvisits.visit_type = 3 THEN
'TRANSITION_BOOKMARK'
WHEN moz_historyvisits.visit_type = 4 THEN
'TRANSITION_EMBED'
WHEN moz_historyvisits.visit_type = 5 THEN
'TRANSITION_REDIRECT_PERMANENT'
WHEN moz_historyvisits.visit_type = 6 THEN
'TRANSITION_REDIRECT_TEMPORARY'
WHEN moz_historyvisits.visit_type = 7 THEN
'TRANSITION_DOWNLOAD'
WHEN moz_historyvisits.visit_type = 8 THEN
'TRANSITION_FRAMED_LINK'
WHEN moz_historyvisits.visit_type = 9 THEN
'TRANSITION_RELOAD'
END AS VisitType,
CASE

WHEN moz_places.hidden = 0 THEN
'No'
WHEN moz_places.hidden = 1 THEN
'Yes'
END AS Hidden,
CASE

WHEN moz_places.typed = 0 THEN
'No'
WHEN moz_places.typed = 1 THEN
'Yes'
END AS Typed,
moz_places.frecency AS Frecency
FROM
moz_places
INNER JOIN moz_historyvisits ON moz_places.id = moz_historyvisits.place_id
ORDER BY
moz_historyvisits.visit_date ASC
`,baseFileName:`History`,blobColumns:[]}]},{id:`690cd1e6-def2-42d4-8cc8-64858cd9d4e4`,description:`Google Drive - Changes`,csvPrefix:`GoogleDrive`,fileName:`random.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='change_buffer_entries' OR name='fschanges');`,identifyValue:`2`,queries:[{name:`Google Drive FS Changes`,query:`SELECT
sqlite_sequence.seq AS Sequence,
fschanges.identifier AS Identifier,
fschanges.direction AS Direction,
fschanges."action" AS "Action",
fschanges.inode AS Inode,
fschanges.parent_inode AS ParentInode,
fschanges.volume AS Volume,
fschanges.parent_volume AS ParentVolume,
fschanges.path AS Path,
fschanges.name AS Name,
CASE

WHEN fschanges.is_folder = 0 THEN
'No'
WHEN fschanges.is_folder = 1 THEN
'Yes'
END AS IsFolder,
CASE

WHEN fschanges.affects_gdoc = 0 THEN
'No'
WHEN fschanges.affects_gdoc = 1 THEN
'Yes'
END AS AffectsGDocs,
datetime( modified, 'unixepoch' ) AS ModifiedTime,
fschanges.size AS SizeInBytes,
CASE

WHEN fschanges.shared = 0 THEN
'No'
WHEN fschanges.shared = 1 THEN
'Yes'
END AS Shared,
CASE

WHEN doc_type = 0 THEN
'Folder'
WHEN doc_type = 1 THEN
'Regular File'
WHEN doc_type = 2 THEN
'Google Slides'
WHEN doc_type = 3 THEN
'Google Forms'
WHEN doc_type = 4 THEN
'Google Sheets'
WHEN doc_type = 5 THEN
'Google Draw'
WHEN doc_type = 6 THEN
'Google Docs'
WHEN doc_type = 12 THEN
'Google Maps' ELSE 'Google File/Object'
END AS DocType,
fschanges.full_path AS FullPath,
fschanges.hash AS Hash,
change_buffer_entries.failure_count AS FailureCount,
change_buffer_entries.time AS Time,
change_buffer_entries.state AS State
FROM
fschanges
LEFT JOIN change_buffer_entries ON fschanges.identifier = change_buffer_entries.identifier,
sqlite_sequence
ORDER BY
fschanges.identifier ASC
`,baseFileName:`FSChanges`,blobColumns:[]}]},{id:`a8579549-8776-42ce-858a-7425f8f6c039`,description:`Google Drive Cloud Graph database`,csvPrefix:`GoogleDrive`,fileName:`cloud_graph.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='cloud_graph_entry');`,identifyValue:`1`,queries:[{name:`Google Drive CloudGraphDB`,query:`SELECT
filename AS 'Filename',
datetime( modified, 'unixepoch' ) AS 'ModifiedTime',
CASE

WHEN acl_role = 0 THEN
'Private/Google Drive Owner'
WHEN acl_role = 1 THEN
'Can Contribute'
WHEN acl_role = 2 THEN
'Can View' ELSE 'From Elsewhere'
END AS 'ACL Role',
CASE

WHEN doc_type = 0 THEN
'Folder'
WHEN doc_type = 1 THEN
'Regular File'
WHEN doc_type = 2 THEN
'Google Slides'
WHEN doc_type = 3 THEN
'Google Forms'
WHEN doc_type = 4 THEN
'Google Sheets'
WHEN doc_type = 5 THEN
'Google Draw'
WHEN doc_type = 6 THEN
'Google Docs'
WHEN doc_type = 12 THEN
'Google Maps' ELSE 'Google File/Object'
END AS Type,
size AS 'Size in bytes',
checksum AS 'MD5 Hash',
CASE

WHEN shared = 1 THEN
'Shared'
WHEN shared = 0 THEN
'Not Shared'
END AS 'Shared Status',
CASE

WHEN removed = 0 THEN
'Not Removed'
WHEN removed = 1 THEN
'Removed'
END AS 'Cloud Status'
FROM
cloud_graph_entry
`,baseFileName:`CloudGraphDB`,blobColumns:[]}]},{id:`2f075e8c-7789-437d-90c6-96c45387f08f`,description:`Google Drive for Desktop Metadata`,csvPrefix:`GoogleDrive`,fileName:`metadata_sqlite_db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='items');`,identifyValue:`1`,queries:[{name:`Google Drive for Desktop Metadata`,query:`SELECT
items.stable_id,
items.local_title as "Name",
items.file_size as "SizeInBytes",
items.mime_type,
datetime(items.modified_date / 1000, 'unixepoch') as "ModifiedTime",
datetime(items.viewed_by_me_date / 1000, 'unixepoch') as "LastInteractionTime",
CASE
when items.is_folder = 1 then "Folder"
when items.is_folder = 0 then "File"
end as "IsFolder",
CASE
when items.trashed = 1 then "Deleted"
when items.trashed = 0 then "Not Deleted"
end as "DeletionStatus",
CASE
when items.is_owner = 1 then "Owner"
when items.is_owner = 0 then "Not Owner"
end as "Ownership",
CASE
when items.shared_with_me_date = 1 then "Shared"
when items.shared_with_me_date = 0 then "Not Shared"
end as "SharedWithUser",
items.id AS "CloudIdentifier"
FROM
items
`,baseFileName:`metadata_sqlite_db`,blobColumns:[]}]},{id:`c17e9884-49fb-468b-a623-6eac312cf9f4`,description:`Google Drive Snapshot database`,csvPrefix:`GoogleDrive`,fileName:`snapshot.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='cloud_entry' OR name='volume_info' OR name='cloud_relations' OR name='local_entry' OR name='local_relations');`,identifyValue:`5`,queries:[{name:`Google Drive SnapshotDB - Cloud Files`,query:`SELECT
cloud_entry.doc_id AS ID,
( SELECT cloud_entry.filename FROM cloud_entry WHERE cloud_relations.parent_doc_id = cloud_entry.doc_id ) AS ParentFolder,
filename AS Filename,
datetime( modified, 'unixepoch' ) AS ModifiedTime,
CASE

WHEN acl_role = 0 THEN
'Google Drive Owner' ELSE 'From Elsewhere'
END AS ACLRole,
CASE

WHEN doc_type = 0 THEN
'Folder'
WHEN doc_type = 1 THEN
'Regular File'
WHEN doc_type = 2 THEN
'Google Slides'
WHEN doc_type = 3 THEN
'Google Forms'
WHEN doc_type = 4 THEN
'Google Sheets'
WHEN doc_type = 5 THEN
'Google Draw'
WHEN doc_type = 6 THEN
'Google Docs'
WHEN doc_type = 12 THEN
'Google Maps' ELSE 'Google File/Object'
END AS Type,
size AS 'SizeInBytes',
checksum AS Checksum,
CASE

WHEN shared = 1 THEN
'Shared'
WHEN shared = 0 THEN
'Not Shared'
END AS SharedStatus,
CASE

WHEN removed = 1 THEN
'Yes'
WHEN removed = 0 THEN
'No'
END AS RemovedStatus
FROM
cloud_entry
LEFT JOIN cloud_relations ON cloud_relations.child_doc_id = cloud_entry.doc_id
ORDER BY
cloud_entry.modified ASC
`,baseFileName:`SnapshotCloudFiles`,blobColumns:[]},{name:`Google Drive SnapshotDB - Local Files`,query:`SELECT
local_entry.inode AS FileID,
local_entry.volume AS Volume,
( SELECT local_entry.filename FROM local_entry WHERE local_relations.parent_inode = local_entry.inode ) AS ParentFolder,
local_entry.filename AS Filename,
datetime( modified, 'unixepoch' ) AS "ModifiedTime",
local_entry.checksum AS Checksum,
local_entry.size AS SizeInBytes,
CASE

WHEN is_folder = 0 THEN
'No'
WHEN is_folder = 1 THEN
'Yes'
END AS IsFolder
FROM
local_entry AS local_entry
LEFT JOIN local_relations ON local_relations.child_inode = local_entry.inode
ORDER BY
local_entry.inode ASC
`,baseFileName:`SnapshotLocalFiles`,blobColumns:[]},{name:`Google Drive SnapshotDB - Volume Info`,query:`SELECT
main.volume_info.volume AS Volume,
main.volume_info.full_path AS FullPath,
main.volume_info.uuid AS UUID,
main.volume_info.label AS DriveLabel,
main.volume_info.size AS SizeInBytes,
main.volume_info.filesystem AS DriveFormat,
main.volume_info.model AS DriveModel,
main.volume_info.device_type AS DeviceType,
main.volume_info.device_file AS DeviceFile,
main.volume_info.device_number AS DeviceSerialNumber
FROM
main.volume_info
ORDER BY
main.volume_info.full_path ASC
`,baseFileName:`SnapshotVolumeInfo`,blobColumns:[]}]},{id:`ebd2e7bf-11ae-4b61-8126-1958ee46d570`,description:`Google Drive Sync Config database`,csvPrefix:`GoogleDrive`,fileName:`sync_config.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='data');`,identifyValue:`1`,queries:[{name:`Google Drive Sync Config Database`,query:`SELECT
data.entry_key AS EntryKey,
data.data_key AS DataKey,
data.data_value AS DataValue
FROM
data
`,baseFileName:`SyncConfigDB`,blobColumns:[]}]},{id:`35e1ef80-0311-4eb7-8b18-724aa572ae46`,description:`Idrive Backups`,csvPrefix:`Idrive`,fileName:`random.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='ibfile');`,identifyValue:`1`,queries:[{name:`Files`,query:`SELECT
    ibfolder.NAME
AS
    'file_directory',
    ibfile.NAME
AS
    'filen_name',
    ibfile.FILE_SIZE
AS
    'file_size',
    ibfile.FILE_LMD
AS
    'file_modify_date'
FROM
    ibfile
INNER JOIN
    ibfolder
ON
    ibfile.DIRID = ibfolder.DIRID;
`,baseFileName:`BackupFiles`,blobColumns:[]}]},{id:`bf7b0ce2-c49c-42e4-a690-ce8e1b9d630c`,description:`Ivanti Application Monitoring`,csvPrefix:`Ivanti`,fileName:`IvAppMon.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='applications' OR name='modifiedFiles' OR name='networkOperations' OR name='networkProtocols' OR name='usedApplications' OR name='usedImages');`,identifyValue:`6`,queries:[{name:`Ivanti`,query:`SELECT
  "NO".*,
  np.protocol,
  a.*
FROM
  networkOperations AS "NO"
  LEFT JOIN networkProtocols AS np ON "NO".applications_id = np.applications_id
  LEFT JOIN applications AS a ON "NO".applications_id = a.id
`,baseFileName:`AppMon`,blobColumns:[]}]},{id:`afa8cd82-e364-41e9-8d5b-8ec7ff466bce`,description:`Microsoft Sticky Notes Database`,csvPrefix:`MicrosoftStickyNotes`,fileName:`plum.sqlite`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='Note' OR name='Media' OR name='Insight' OR name='User' OR name='Stroke');`,identifyValue:`5`,queries:[{name:`Microsoft Sticky Notes`,query:`SELECT
datetime( ( "CreatedAt" / 10000000 ) - 62135596800, 'unixepoch' ) AS CreatedAt,
datetime( ( "UpdatedAt" / 10000000 ) - 62135596800, 'unixepoch' ) AS UpdatedAt,
datetime( ( "DeletedAt" / 10000000 ) - 62135596800, 'unixepoch' ) AS DeletedAt,
Note.WindowPosition AS WindowPosition,
CASE
WHEN Note.IsOpen = 0 THEN 'No'
WHEN Note.IsOpen = 1 THEN 'Yes'
ELSE 'Unknown'
END AS IsOpen,
CASE
WHEN Note.IsAlwaysOnTop = 0 THEN 'No'
WHEN Note.IsAlwaysOnTop = 1 THEN 'Yes'
ELSE 'Unknown'
END AS IsAlwaysOnTop,
Note.Theme AS Theme,
Note.Id AS NoteID,
Note.ParentId AS ParentID,
Note.Text AS Text,
Note.LastServerVersion AS LastServerVersion
FROM
Note
ORDER BY
Note.CreatedAt ASC
`,baseFileName:`NotesDB`,blobColumns:[]}]},{id:`8bb1ab82-653d-4279-b69c-b69f645b985e`,description:`Msty Database Tables`,csvPrefix:`Msty`,fileName:`msty.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='api_keys' OR name='app_settings' OR name='chat_messages' OR name='chats' OR name='knowledge_stacks');`,identifyValue:`5`,queries:[{name:`API Keys`,query:`SELECT
id AS ID,
name AS Name,
key AS Key,
provider AS Provider,
created_at AS CreatedAt,
key_hint AS KeyHint,
models AS Models,
extras AS Extras,
save_in_keychain AS SaveInKeychain
FROM api_keys
`,baseFileName:`ApiKeys`,blobColumns:[]},{name:`App Settings`,query:`SELECT
key AS Key,
value AS Value
FROM app_settings
`,baseFileName:`AppSettings`,blobColumns:[]},{name:`Chat Messages`,query:`SELECT
id AS MessageID,
chat_id AS ChatID,
text AS Text,
config AS Config,
role AS Role,
sync_buddy_id AS SyncBuddyID,
refinement_prompt AS RefinementPrompt,
parent_id AS ParentID,
branch_parent_id AS BranchParentID,
model_name AS ModelName,
attachments AS Attachments,
extras AS Extras,
refinement_active_id AS RefinementActiveID,
created_at AS CreatedAt,
knowledge_stack_attachment AS KnowledgeStackAttachment,
knowledge_stack_query_results AS KnowledgeStackQueryResults,
real_time_data_sources AS RealTimeDataSources,
delve_parent_chat_id AS DelveParentChatID,
delve_info AS DelveInfo,
prompt_response_metrics AS PromptResponseMetrics
FROM chat_messages
`,baseFileName:`ChatMessages`,blobColumns:[]},{name:`Chats`,query:`SELECT
id AS ChatID,
title AS Title,
model_vendor AS ModelVendor,
model_name AS ModelName,
config AS Config,
parent_chat_id AS ParentChatID,
created_at AS CreatedAt,
chat_session_id AS ChatSessionID,
extras AS Extras,
delve_parent_chat_id AS DelveParentChatID,
delve_info AS DelveInfo,
prompt_response_metrics AS PromptResponseMetrics
FROM chats
`,baseFileName:`Chats`,blobColumns:[]},{name:`Knowledge Stacks`,query:`SELECT
id AS StackID,
title AS Title,
status AS Status,
files AS Files,
notes AS Notes,
youtube_links AS YouTubeLinks,
directories AS Directories,
obsidian_vaults AS ObsidianVaults,
vector_info AS VectorInfo,
config AS Config,
tags AS Tags,
is_bookmarked AS IsBookmarked,
created_at AS CreatedAt,
updated_at AS UpdatedAt,
compose_stats AS ComposeStats,
reranking AS ReRanking,
composed_at AS ComposedAt
FROM knowledge_stacks
`,baseFileName:`KnowledgeStacks`,blobColumns:[]}]},{id:`6f9a2fe7-6052-414e-bda0-448b95e8d5ac`,description:`Nessus Preferences Database`,csvPrefix:`Nessus`,fileName:`nessusd.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='PREFERENCES');`,identifyValue:`1`,queries:[{name:`Nessus Preferences Database`,query:`SELECT
PREFERENCES.name AS Name,
PREFERENCES.value AS Value
FROM
PREFERENCES
`,baseFileName:`Preferences`,blobColumns:[]}]},{id:`46qxess2-p252-j011-y626-a2l74p3sx815`,description:`Notion App Entries`,csvPrefix:`Notion`,fileName:`notion.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='block');`,identifyValue:`1`,queries:[{name:`Entries`,query:`SELECT
    block.id,
    space_id,
    block.version,
    type,
    properties,
    collection_id,
    created_time,
    created_by,
    name AS "created_by_name",
    last_edited_time,
    last_edited_by,
    parent_id
FROM
    block
INNER JOIN
    notion_user
ON
    notion_user.id = block.created_by_id;
`,baseFileName:`NotionEntries`,blobColumns:[]}]},{id:`4a5e2e51-8951-445f-8988-8742e1681604`,description:`pCloud`,csvPrefix:`pCloud`,fileName:`data.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='task' OR name='syncfolderdelayed' OR name='syncfolder' OR name='syncedfolder' OR name='sqlite_stat1' OR name='sqlite_sequence' OR name='sharerequest' OR name='sharedfolder' OR name='setting' OR name='resolver' OR name='pagecachetask' OR name='pagecache' OR name='myteams' OR name='localfolder' OR name='localfileupload' OR name='localfile' OR name='links' OR name='hashchecksum' OR name='fsxattr' OR name='fstaskupload' OR name='fstaskfileid' OR name='fstaskdepend' OR name='fstask' OR name='folder' OR name='filerevision' OR name='file' OR name='devices' OR name='cryptofolderkey' OR name='cryptofilekey' OR name='contacts' OR name='bsharedfolder' OR name='baccountteam' OR NAME='baccountemail');`,identifyValue:`33`,queries:[{name:`pCloud Settings`,query:`SELECT
setting.id,
setting.value
FROM
setting
`,baseFileName:`Settings`,blobColumns:[]},{name:`pCloud`,query:`WITH RECURSIVE folder_lookup ( folder_id, parent_folder_id, full_path ) AS (
VALUES
( '0', '', '' ) UNION
SELECT
id,
folder.parentfolderid,
full_path || '\\' || name
FROM
folder,
folder_lookup
WHERE
folder_lookup.folder_id = folder.parentfolderid
) SELECT
folder_id AS FolderID,
parent_folder_id AS ParentFolderID,
file.id AS FileId,
full_path || '\\' || file.name AS FilePath,
file.size AS FileSizeBytes,
( file.size / 1048576.0 ) AS FileSizeMB,
icon AS FileType,
file.ctime AS FileCTime,
datetime( file.ctime, 'unixepoch', 'utc' ) AS FileCTimeConvertedUTC,
file.mtime AS FileMtime,
datetime( file.mtime, 'unixepoch', 'utc' ) AS FileMTimeConvertedUTC
FROM
folder_lookup,
file
WHERE
file.parentfolderid = folder_id
`,baseFileName:`SyncedItems`,blobColumns:[]}]},{id:`4d4cfd29-ebc9-4382-a946-5de2878e1c3c`,description:`Windows Photos Database`,csvPrefix:`WindowsPhotos`,fileName:`MediaDb.v1.sqlite`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='Item' OR name='Folder');`,identifyValue:`2`,queries:[{name:`Windows Photos Items`,query:`select item.Item_FileName AS Item_FileName,
item.Item_FileSize AS Item_FileSize,
item.Item_Width AS Item_Width,
item.Item_Height AS Item_Height,
item.Item_Latitude AS Item_Latitude,
item.Item_Longitude AS Item_Longitude,
ApplicationName.ApplicationName_Text,
CameraManufacturer.CameraManufacturer_Text,
CameraModel.CameraModel_Text,
datetime((item.Item_DateTaken - 116444736000000000) / 10000000, 'unixepoch', 'localtime') AS Item_DateTaken,
datetime((item.Item_DateCreated - 116444736000000000) / 10000000, 'unixepoch', 'localtime') AS Item_DateCreated,
datetime((item.Item_DateModified - 116444736000000000) / 10000000, 'unixepoch', 'localtime') AS Item_DateModified,
datetime((item.Item_DateIngested - 116444736000000000) / 10000000, 'unixepoch', 'localtime') AS Item_DateIngested
FROM item
LEFT JOIN ApplicationName ON item.Item_ApplicationNameId = ApplicationName.ApplicationName_Id
LEFT JOIN CameraManufacturer ON item.Item_CameraManufacturerId = CameraManufacturer.CameraManufacturer_Id
LEFT JOIN CameraModel ON item.Item_CameraModelId = CameraModel.CameraModel_Id
ORDER BY Item_DateCreated DESC
`,baseFileName:`ItemDB`,blobColumns:[]},{name:`Windows Photos Folders`,query:`select Folder.Folder_Path AS Folder_Path,
Folder.Folder_DisplayName AS Folder_DisplayName,
Folder.Folder_ItemCount AS Folder_ItemCount,
datetime((Folder.Folder_DateCreated - 116444736000000000) / 10000000, 'unixepoch', 'localtime') AS Folder_DateCreated,
datetime((Folder.Folder_DateModified - 116444736000000000) / 10000000, 'unixepoch', 'localtime') AS Folder_DateModified
FROM Folder ORDER BY Folder_DateCreated DESC
`,baseFileName:`FolderDB`,blobColumns:[]}]},{id:`5dece751-3755-41e4-a9b5-d6fce9b1f524`,description:`Remote Desktop Manager Databases`,csvPrefix:`RemoteDesktopManager`,fileName:`Connections.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='Connections' OR name='Attachment' OR name='ConnectionHandbook' OR name='ConnectionHandbookHistory' OR name='ConnectionLog' OR name='ConnectionHistory');`,identifyValue:`6`,queries:[{name:`Connections`,query:`SELECT c.ID as ConnectionID, c.DATA, c.CreationDate, c.ModifiedDate, c.ModifiedUsername, c.ModifiedLoggedUsername, c.SecurityGroup, c.CustomerID, c.ConnectionType, c.ConnectionSubType, c.GroupName, c.Name, c.AttachmentCount, c.AttachmentPrivateCount, c.HandbookCount    FROM Connections AS c
`,baseFileName:`Connections`,blobColumns:[]},{name:`ConnectionLog`,query:`SELECT l.ID as ConnectionLogID, l.Username, l.MachineName, l.Message, l.MessageType, l.ConnectionName, l.ConnectionTypeName, l.StartDateTimeUTC, l.EndDateTimeUTC, l.CreationDate, l.LoggedUserName, l.GroupName, l.HostName, l.ActiveTime, l.Application, c.ID as ConnectionID, c.DATA, c.CreationDate, c.ModifiedDate, c.ModifiedUsername, c.ModifiedLoggedUsername, c.SecurityGroup, c.CustomerID, c.ConnectionType, c.ConnectionSubType, c.GroupName, c.Name, c.AttachmentCount, c.AttachmentPrivateCount, c.HandbookCount FROM ConnectionLog AS l INNER JOIN Connections AS c ON l.ConnectionID = c.ID
`,baseFileName:`ConnectionLog`,blobColumns:[]},{name:`Attachments`,query:`SELECT a.ID as AttachmentID, a.Description, a.CreationDateTime, a.Username, a.Data, a.AttachmentData, a.FileSize, c.ID as ConnectionID, c.DATA, c.CreationDate, c.ModifiedDate, c.ModifiedUsername, c.ModifiedLoggedUsername, c.SecurityGroup, c.CustomerID, c.ConnectionType, c.ConnectionSubType, c.GroupName, c.Name, c.AttachmentCount, c.AttachmentPrivateCount, c.HandbookCount FROM Attachment AS a INNER JOIN Connections AS c  ON a.ConnectionID = c.ID
`,baseFileName:`Attachments`,blobColumns:[]},{name:`Handbook`,query:`SELECT hb.ID as HandbookID, hb.Name, hb.Data, hb.CreationDate, hb.CreationUsername, hb.CreationLoggedUsername, hb.ModifiedDate, hb.ModifiedUsername, hb.ModifiedLoggedUsername, hb.GroupName, hb.SortPriority, hb.IsDefault, hb.DocumentationType, c.ID as ConnectionID, c.DATA, c.CreationDate, c.ModifiedDate, c.ModifiedUsername, c.ModifiedLoggedUsername, c.SecurityGroup, c.CustomerID, c.ConnectionType, c.ConnectionSubType, c.GroupName, c.Name, c.AttachmentCount, c.AttachmentPrivateCount, c.HandbookCount FROM ConnectionHandbook as hb INNER JOIN Connections as c ON hb.ConnectionID = c.ID
`,baseFileName:`Handbook`,blobColumns:[]},{name:`HandbookHistory`,query:`SELECT hbh.ID as HanbookHistoryID, hbh.HistoryType, hbh.Name, hbh.Data, hbh.ModifiedDate, hbh.ModifiedUsername, hbh.ModifiedLoggedUsername, hbh.GroupName, hbh.SortPriority, hbh.IsDefault, hbh.IsRevertable, hbh.CreationDate, hbh.CreationUsername, hbh.CreationLoggedUsername, hbh.DocumentationType, hb.ID as HandbookID, hb.Name, hb.Data, hb.CreationDate, hb.CreationUsername, hb.CreationLoggedUsername, hb.ModifiedDate, hb.ModifiedUsername, hb.ModifiedLoggedUsername, hb.GroupName, hb.SortPriority, hb.IsDefault, hb.DocumentationType, c.ID as ConnectionID, c.DATA, c.CreationDate, c.ModifiedDate, c.ModifiedUsername, c.ModifiedLoggedUsername, c.SecurityGroup, c.CustomerID, c.ConnectionType, c.ConnectionSubType, c.GroupName, c.Name, c.AttachmentCount, c.AttachmentPrivateCount, c.HandbookCount  FROM ConnectionHandbookHistory as hbh INNER JOIN Connections as c ON hbh.ConnectionID = c.ID INNER JOIN ConnectionHandbook as hb ON hb.ID = hbh.ConnectionHandbookID
`,baseFileName:`HandbookHistory`,blobColumns:[]}]},{id:`3985bd8a-6b2a-4ea3-ae32-5fccf14d6562`,description:`Windows Search Index Windows DB`,csvPrefix:`Windows`,fileName:`Windows.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='SystemIndex_1_Properties' OR name='SystemIndex_1_PropertyStore' OR name='SystemIndex_1_PropertyStore_Metadata');`,identifyValue:`3`,queries:[{name:`SystemIndex Properties`,query:`SELECT * FROM SystemIndex_1_Properties;`,baseFileName:`SystemIndex_1_Properties`,blobColumns:[]},{name:`SystemIndex PropertyStore`,query:`SELECT * FROM SystemIndex_1_PropertyStore;`,baseFileName:`SystemIndex_1_PropertyStore`,blobColumns:[]},{name:`SystemIndex PropertyStore Metadata`,query:`SELECT * FROM SystemIndex_1_PropertyStore_Metadata;`,baseFileName:`SystemIndex_1_PropertyStore_Metadata`,blobColumns:[]},{name:`Joined PropertyStore Metadata`,query:`SELECT * FROM SystemIndex_1_PropertyStore AS PS JOIN SystemIndex_1_PropertyStore_Metadata AS PS_META WHERE PS_META.Id = PS.ColumnId;`,baseFileName:`Joined_PropertyStore_Metadata`,blobColumns:[]}]},{id:`27d84ae5-df65-4eec-9dd4-0a573f3ea86b`,description:`Windows Search Index Windows Gather DB`,csvPrefix:`Windows_gather`,fileName:`Windows-gather.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='SystemIndex_Gthr' OR name='SystemIndex_GthrPth' OR name='SystemIndex_GthrAppOwner');`,identifyValue:`3`,queries:[{name:`SystemIndex Gthr`,query:`SELECT * FROM SystemIndex_Gthr;`,baseFileName:`SystemIndex_Gthr`,blobColumns:[]},{name:`SystemIndex GthrPth`,query:`SELECT * FROM SystemIndex_GthrPth;`,baseFileName:`SystemIndex_GthrPth`,blobColumns:[]},{name:`SystemIndex GthrAppOwner`,query:`SELECT * FROM SystemIndex_GthrAppOwner;`,baseFileName:`SystemIndex_GthrAppOwner`,blobColumns:[]}]},{id:`dce123b5-afd0-4aca-b422-9as0e176794b`,description:`Simple Sticky Notes`,csvPrefix:`SimpleStickyNotes`,fileName:`Notes.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='NOTEBOOKS' OR name='NOTES');`,identifyValue:`2`,queries:[{name:`Simple Sticky Notes DB`,query:`SELECT
  COALESCE(NOTEBOOKS.ID, NOTES.ID) AS ID,
  NOTEBOOKS.NAME,
  NOTES.STATE,
  datetime((NOTES.CREATED - 25569) * 86400, 'unixepoch', 'localtime', 'utc') AS CREATED_UTC,
  datetime((NOTES.UPDATED - 25569) * 86400, 'unixepoch', 'localtime', 'utc') AS UPDATED_UTC,
CASE

    WHEN NOTES.DELETED = 0 THEN
    'No'
    WHEN NOTES.DELETED = 1 THEN
    'Yes' ELSE NULL
  END AS DELETED_TEXT,
CASE

    WHEN NOTES.STARRED = 0 THEN
    'No'
    WHEN NOTES.STARRED = 1 THEN
    'Yes' ELSE NULL
  END AS STARRED_TEXT,
  NOTES.AOT,
CASE

    WHEN NOTES.MINIMIZE = 0 THEN
    'No'
    WHEN NOTES.MINIMIZE = 1 THEN
    'Yes' ELSE NULL
  END AS MINIMIZED_TEXT,
  NOTES.COLOR,
  NOTES.OPACITY,
  NOTES."LEFT",
  NOTES.TOP,
  NOTES.WIDTH,
  NOTES.HEIGHT,
  NOTES.LOCKED,
  NOTES.ZORDER,
  NOTES.ALARM,
  NOTES.ALARM_CURRENT,
  NOTES.ALARM_PERIOD,
  NOTES.ALARM_DAY,
  NOTES.ALARM_SNOOZE,
  NOTES.ALARM_SOUND,
  NOTEBOOKS.NAME AS NotebookName,
  NOTES.TITLE,
  NOTES.TYPE,
  NOTES.DATA,
  NOTES.TEXT
FROM
  NOTES
  LEFT JOIN NOTEBOOKS ON NOTEBOOKS.ID = NOTES.ID;
`,baseFileName:`NotesDB`,blobColumns:[]}]},{id:`d05d5a1f-7479-4ade-8b6b-92c59a90d45d`,description:`TeraCopy - history`,csvPrefix:`TeraCopy`,fileName:`random.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='Files');`,identifyValue:`1`,queries:[{name:`TeraCopy History`,query:`SELECT
	Source,
	size AS "Size (Bytes)",
CASE

		WHEN IsFolder = 0 THEN
		'No'
		WHEN IsFolder = 1 THEN
		'Yes'
	END AS IsFolder,
CASE

		WHEN Marked = 0 THEN
		'No'
		WHEN Marked = 1 THEN
		'Yes'
	END AS Marked,
CASE

		WHEN Hidden = 0 THEN
		'No'
		WHEN Hidden = 1 THEN
		'Yes'
	END AS Hidden,
	datetime( julianday( Creation ) ) AS Creation,
	datetime( julianday( Access ) ) AS Access,
	datetime( julianday( Write ) ) AS Write
FROM
	Files
`,baseFileName:`History`,blobColumns:[]},{name:`TeraCopy History Log`,query:`SELECT
	Log.Timestamp AS Timestamp,
	Log.Message AS Message
FROM
	Log
ORDER BY
	Timestamp
`,baseFileName:`HistoryLog`,blobColumns:[]}]},{id:`e470201e-f1d6-448d-8876-4ee267dc523b`,description:`TeraCopy - Main.DB`,csvPrefix:`TeraCopy`,fileName:`main.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='list');`,identifyValue:`1`,queries:[{name:`TeraCopy MainDB`,query:`select
 Name AS "Name of SQLite DB",
 datetime(julianday(Started)) as "Transfer Started",
 datetime(julianday(Finished)) as "Transfer Finished",
 source AS "Source",
 target AS "Target",
 Files AS "Number of Files",
 size AS "Size (Bytes)"
 from list
`,baseFileName:`MainDB`,blobColumns:[]}]},{id:`a226e8a0-fc99-499d-8797-ba80179f349f`,description:`Windows Update History Database`,csvPrefix:`Windows`,fileName:`Store.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='ACTIONRECORDS' OR name='COMPLETEDUPDATES' OR name='UPDATES' OR name='VARIABLES');`,identifyValue:`4`,queries:[{name:`Windows Update Store.db`,query:`SELECT
datetime( Time / 1000, 'unixepoch', 'localtime' ) AS Time,
COMPLETEDUPDATES.PROVIDERID AS ProviderID,
COMPLETEDUPDATES.UPDATEID AS UpdateID,
COMPLETEDUPDATES.TITLE AS Title,
COMPLETEDUPDATES.DESCRIPTION AS Description,
COMPLETEDUPDATES.MOREINFOURL AS MoreInfoURL,
COMPLETEDUPDATES.HISTORYCATEGORY AS HistoryCategory,
COMPLETEDUPDATES.UNINSTALL AS Uninstall
FROM
COMPLETEDUPDATES
ORDER BY
COMPLETEDUPDATES.TIME ASC
`,baseFileName:`WindowsUpdateStoreDB`,blobColumns:[]}]},{id:`cd952d69-7b3e-4d13-9810-8d987155bc58`,description:`Windows WPNDatabase - Notifications`,csvPrefix:`Windows`,fileName:`wpndatabase.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='Notification' OR name='HandlerAssets' OR name='WNSPushChannel' OR name='TransientTable' OR name='NotificationData');`,identifyValue:`5`,queries:[{name:`Windows Notifications`,query:`SELECT
Notification.Id AS ID,
Notification.'Order' AS 'Order',
Notification.HandlerId AS HandlerId,
NotificationHandler.PrimaryId AS Application,
CASE

WHEN NotificationHandler.ParentId THEN
NotificationHandler.ParentId ELSE ''
END AS Parent,
NotificationHandler.HandlerType AS HandlerType,
Notification.Type AS Type,
Notification.Payload AS Payload,
Notification.PayloadType AS PayloadType,
Notification.Tag AS Tag,
Notification."Group" AS "Group",
datetime( ( Notification.ArrivalTime - 116444736000000000 ) / 10000000, 'unixepoch' ) AS ArrivalTime,
CASE

WHEN Notification.ExpiryTime = 0 THEN
'Expired' ELSE datetime( ( Notification.ExpiryTime - 116444736000000000 ) / 10000000, 'unixepoch' )
END AS ExpirationTime,
NotificationHandler.CreatedTime AS HandlerCreated,
NotificationHandler.ModifiedTime AS HandlerModified,
CASE

WHEN NotificationHandler.WNSId NOTNULL THEN
NotificationHandler.WNSId ELSE ''
END AS WNSId,
CASE

WHEN NotificationHandler.WNFEventName NOTNULL THEN
NotificationHandler.WNFEventName ELSE ''
END AS WNFEventName,
CASE

WHEN WNSPushChannel.ChannelId NOTNULL THEN
WNSPushChannel.ChannelId ELSE ''
END AS ChannelID,
CASE

WHEN WNSPushChannel.Uri NOTNULL THEN
WNSPushChannel.Uri ELSE ''
END AS URI,
CASE

WHEN WNSPushChannel.CreatedTime NOTNULL THEN
datetime( ( WNSPushChannel.CreatedTime - 116444736000000000 ) / 10000000, 'unixepoch' ) ELSE ''
END AS WNSCreatedTime,
CASE

WHEN WNSPushChannel.ExpiryTime NOTNULL THEN
datetime( ( WNSPushChannel.ExpiryTime - 116444736000000000 ) / 10000000, 'unixepoch' ) ELSE ''
END AS WNSExpirationTime,
CASE

WHEN hex( Notification.ActivityId ) = '00000000000000000000000000000000' THEN
'' ELSE hex( Notification.ActivityId )
END AS ActivityId
FROM
Notification
JOIN NotificationHandler ON NotificationHandler.RecordId = Notification.HandlerId
LEFT JOIN WNSPushChannel ON WNSPushChannel.HandlerId = NotificationHandler.RecordId
ORDER BY
Id DESC
`,baseFileName:`NotificationsDB-Notifications`,blobColumns:[]}]},{id:`a91038dd-baa5-42a3-a92e-e1105171c6fa`,description:`Windows WPNDatabase - WNSPushChannel`,csvPrefix:`Windows`,fileName:`wpndatabase.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='Notification' OR name='HandlerAssets' OR name='WNSPushChannel' OR name='TransientTable' OR name='NotificationData');`,identifyValue:`5`,queries:[{name:`Windows Notifications`,query:`SELECT
NotificationHandler.PrimaryId AS PrimaryID,
WNSPushChannel.ChannelId AS ChannelID,
WNSPushChannel.HandlerId AS HandlerID,
WNSPushChannel.Uri AS URI,
datetime( ( WNSPushChannel.CreatedTime - 116444736000000000 ) / 10000000, 'unixepoch' ) AS CreatedTime,
datetime( ( WNSPushChannel.ExpiryTime - 116444736000000000 ) / 10000000, 'unixepoch' ) AS ExpirationTime
FROM
WNSPushChannel
JOIN NotificationHandler ON NotificationHandler.RecordId = WNSPushChannel.HandlerId
ORDER BY
CreatedTime ASC
`,baseFileName:`NotificationsDBN-WNSPushChannel`,blobColumns:[]}]},{id:`5865567d-06d2-4831-87ec-0aaf11f840a2`,description:`Windows Your Phone Contacts DB`,csvPrefix:`WindowsYourPhone`,fileName:`contacts.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='contact' OR name='contactdate' OR name='contacturl' OR name='emailaddress' OR name='phonenumber' OR name='postaladdress');`,identifyValue:`6`,queries:[{name:`Windows Your Phone Contacts Database`,query:`SELECT DISTINCT
contact.display_name AS DisplayName,
contact.nickname AS Nickname,
datetime( ( last_updated_time / 10000000 ) - 11644473600, 'unixepoch' ) AS LastUpdatedTimeUTC,
contact.company AS Company,
contact.job_title AS Title,
contact.notes AS Notes,
contact.name_prefix AS Prefix,
contact.given_name AS GivenName,
contact.middle_name AS MiddleName,
contact.family_name AS FamilyName,
contact.name_suffix AS Suffix,
CASE

WHEN contactdate.date_type = 1 THEN
'Birthday'
WHEN contactdate.date_type = 2 THEN
'Anniversary'
WHEN contactdate.date_type = 3 THEN
'UserDefined' ELSE contactdate.date_type
END AS DateType,
contactdate.label AS DateLabel,
contactdate.display_date AS DisplayDate,
CASE

WHEN contacturl.type = 1 THEN
'HomePage'
WHEN contacturl.type = 3 THEN
'Work'
WHEN contacturl.type = 5 THEN
'Other'
WHEN contacturl.type = 6 THEN
'Blog/Profile/UserDefined' ELSE contacturl.type
END AS URLType,
contacturl.label AS URLLabel,
contacturl.url_address AS URLAddress,
CASE

WHEN emailaddress.type = 1 THEN
'Home'
WHEN emailaddress.type = 2 THEN
'Work'
WHEN emailaddress.type = 4 THEN
'Other'
WHEN emailaddress.type = 5 THEN
'UserDefined' ELSE emailaddress.type
END AS EmailType,
emailaddress.label AS EmailLabel,
emailaddress.address AS EmailAddress,
phonenumber.phone_number AS PhoneNumber,
phonenumber.display_phone_number AS DisplayPhoneNumber,
CASE

WHEN phonenumber.phone_number_type = 1 THEN
'Home'
WHEN phonenumber.phone_number_type = 2 THEN
'Mobile'
WHEN phonenumber.phone_number_type = 3 THEN
'Work'
WHEN phonenumber.phone_number_type = 4 THEN
'WorkMobile'
WHEN phonenumber.phone_number_type = 5 THEN
'Main'
WHEN phonenumber.phone_number_type = 6 THEN
'Other/HomeFax/WorkFax/Pager'
WHEN phonenumber.phone_number_type = 8 THEN
'UserDefined' ELSE phonenumber.phone_number_type
END AS PhoneNumberType,
phonenumber.label AS PhoneNumberLabel,
CASE

WHEN postaladdress.type = 1 THEN
'Home'
WHEN postaladdress.type = 2 THEN
'Work'
WHEN postaladdress.type = 4 THEN
'Other'
WHEN postaladdress.type = 5 THEN
'UserDefined' ELSE postaladdress.type
END AS PostalAddressType,
postaladdress.label AS PostalAddressLabel,
postaladdress.street AS PostalAddressStreet,
postaladdress.city AS PostalAddressCity,
postaladdress.region AS PostalAddressRegion,
postaladdress.postal_code AS PostalAddressPostalCode,
postaladdress.country_code AS PostalAddressCountryCode,
postaladdress.display_address AS PostalAddressDisplayAddress
FROM
contact
LEFT JOIN contactdate ON contact.contact_id = contactdate.contact_id
LEFT JOIN contacturl ON contact.contact_id = contacturl.contact_id
LEFT JOIN emailaddress ON contact.contact_id = emailaddress.contact_id
LEFT JOIN phonenumber ON contact.contact_id = phonenumber.contact_id
LEFT JOIN postaladdress ON contact.contact_id = postaladdress.contact_id
ORDER BY
contact.display_name ASC
`,baseFileName:`ContactsDB`,blobColumns:[]}]},{id:`736e7cef-7d90-4d06-99f9-5a29e9ca431b`,description:`Windows Your Phone Notifications DB`,csvPrefix:`WindowsYourPhone`,fileName:`Notifications.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='notifications');`,identifyValue:`1`,queries:[{name:`Windows Your Phone Notifications Database`,query:`SELECT
notifications.id AS 'ID',
json_extract ( json, '$.appName' ) AS 'Application',
datetime( json_extract ( json, '$.postTime' ) / 1000, 'unixepoch', 'localtime' ) AS 'PostTime',
datetime( json_extract ( json, '$.timestamp' ) / 1000, 'unixepoch', 'localtime' ) AS 'Timestamp',
json_extract ( json, '$.tickerText' ) AS 'TickerText',
json_extract ( json, '$.title' ) AS 'Title',
json_extract ( json, '$.bigText' ) AS 'BigText',
json_extract ( json, '$.text' ) AS 'Text',
json_extract ( json, '$.subText' ) AS 'SubText',
CASE

WHEN json_extract ( json, '$.isClearable' ) = 0 THEN
'No'
WHEN json_extract ( json, '$.isClearable' ) = 1 THEN
'Yes'
END AS 'IsClearable',
CASE

WHEN json_extract ( json, '$.isGroup' ) = 0 THEN
'No'
WHEN json_extract ( json, '$.isGroup' ) = 1 THEN
'Yes'
END AS 'IsGroup',
CASE

WHEN json_extract ( json, '$.isOngoing' ) = 0 THEN
'No'
WHEN json_extract ( json, '$.isOngoing' ) = 1 THEN
'Yes'
END AS 'IsOngoing',
json_extract ( json, '$.category' ) AS 'Category',
notifications.package_name AS 'Package Name',
notifications.json AS 'Payload'
FROM
notifications
ORDER BY
notifications.id ASC
`,baseFileName:`NotificationsDB`,blobColumns:[]}]},{id:`6aefdb56-01ad-4a5d-8bd7-28f6c9f31625`,description:`Windows Your Phone SMS Messages`,csvPrefix:`WindowsYourPhone`,fileName:`Phone.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='message' OR name='mms' OR name='rcs_chat' OR name='sync' OR name='subscription');`,identifyValue:`5`,queries:[{name:`Windows Your Phone Phone Database SMS Messages`,query:`SELECT
	message.message_id AS MessageID,
	message.thread_id AS ThreadID,
	datetime( ( "timestamp" / 10000000 ) - 11644473600, 'unixepoch' ) AS Timestamp,
	message.from_address AS "From",
CASE

		WHEN message.type = 1 THEN
		'Received'
		WHEN message.type = 2 THEN
		'Sent' ELSE 'Unknown'
	END AS Type,
	message.body AS Body
FROM
	message
ORDER BY
	message.thread_id ASC,
	message.timestamp ASC
`,baseFileName:`PhoneDB_SMSMessages`,blobColumns:[]},{name:`Windows Your Phone Subscription Info`,query:`SELECT
subscription.subscription_id AS SubscriptionID,
subscription.sim_slot_index AS SimSlotIndex,
subscription.country_iso AS CountryISO,
subscription.name AS WirelessProviderName,
CASE

WHEN subscription.is_roaming = 0 THEN
'No'
WHEN subscription.is_roaming = 1 THEN
'Yes' ELSE 'Unknown'
END AS IsRoaming,
subscription.number AS PhoneNumber,
CASE

WHEN subscription.is_mms_enabled = 0 THEN
'No'
WHEN subscription.is_mms_enabled = 1 THEN
'Yes' ELSE 'Unknown'
END AS IsMMSEnabled,
CASE

WHEN subscription.is_audio_attachment_allowed = 0 THEN
'No'
WHEN subscription.is_audio_attachment_allowed = 1 THEN
'Yes' ELSE 'Unknown'
END AS IsAudioAttachmentAllowed,
CASE

WHEN subscription.is_multipart_sms_enabled = 0 THEN
'No'
WHEN subscription.is_multipart_sms_enabled = 1 THEN
'Yes' ELSE 'Unknown'
END AS IsMultiPartSMSEnabled,
CASE

WHEN subscription.is_group_mms_enabled = 0 THEN
'No'
WHEN subscription.is_group_mms_enabled = 1 THEN
'Yes' ELSE 'Unknown'
END AS IsGroupMMSEnabled,
CASE

WHEN subscription.should_send_multipart_sms_as_separate_messages = 0 THEN
'No'
WHEN subscription.should_send_multipart_sms_as_separate_messages = 1 THEN
'Yes' ELSE 'Unknown'
END AS ShouldSendMultiPartSMSAsSeparateMessages,
subscription.max_message_size AS "MaxMessageSize (Bytes)",
subscription.recipient_limit AS RecipientLimit,
subscription.max_image_height AS MaxImageHeight,
subscription.max_image_width AS MaxImageWidth,
subscription.sms_multipart_to_mms_text_threshold AS SMSMultiParttoMMSTextThreshold,
subscription.sms_to_mms_text_length_threshold AS SMStoMMSTextLengthThreshold,
subscription.max_message_text_length AS MaxMessageTextLength,
subscription.max_subject_length AS MaxSubjectLength,
CASE

WHEN subscription.is_default_data_subscription = 0 THEN
'No'
WHEN subscription.is_default_data_subscription = 1 THEN
'Yes' ELSE 'Unknown'
END AS IsDefaultDataSubscription,
CASE

WHEN subscription.is_default_sms_subscription = 0 THEN
'No'
WHEN subscription.is_default_sms_subscription = 1 THEN
'Yes' ELSE 'Unknown'
END AS IsDefaultSMSSubscription,
CASE

WHEN subscription.is_default_subscription = 0 THEN
'No'
WHEN subscription.is_default_subscription = 1 THEN
'Yes' ELSE 'Unknown'
END AS IsDefaultSubscription,
CASE

WHEN subscription.is_default_voice_subscription = 0 THEN
'No'
WHEN subscription.is_default_voice_subscription = 1 THEN
'Yes' ELSE 'Unknown'
END AS IsDefaultVoiceSubscription,
CASE

WHEN subscription.is_rcs_supported = 0 THEN
'No'
WHEN subscription.is_rcs_supported = 1 THEN
'Yes' ELSE 'Unknown'
END AS IsRCSSupported,
subscription.max_rcs_message_size AS "MaxRCSMessageSize (Bytes)",
subscription.max_rcs_file_size AS "MaxRCSFileSize (Bytes)"
FROM
subscription
`,baseFileName:`PhoneDB_SubscriptionInfo`,blobColumns:[]}]},{id:`560f493c-bdf8-4e23-ac17-3f757c5a048a`,description:`Windows Your Phone Photos DB`,csvPrefix:`WindowsYourPhone`,fileName:`photos.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='media' OR name='photo');`,identifyValue:`2`,queries:[{name:`Windows Your Phone Photos Database`,query:`SELECT
media.id AS 'Media ID',
media.mime_type AS 'MIME Type',
media.name AS Name,
datetime( ( last_updated_time / 10000000 ) - 11644473600, 'unixepoch' ) AS 'Last Updated Time',
datetime( ( taken_time / 10000000 ) - 11644473600, 'unixepoch' ) AS 'Taken Time',
datetime( ( last_seen_time / 10000000 ) - 11644473600, 'unixepoch' ) AS 'Last Seen Time',
media.height AS Height,
media.width AS Width,
media.orientation AS Orientation,
( media.size / 1000.00 ) AS 'Size (kb)',
media.uri AS URI
FROM
media
ORDER BY
media.id ASC
`,baseFileName:`PhotosDB`,blobColumns:[]}]},{id:`c3bb2711-f8e8-425e-89e8-900ea4897283`,description:`Windows Your Phone Settings DB`,csvPrefix:`WindowsYourPhone`,fileName:`settings.db`,identifyQuery:`SELECT count(*) FROM sqlite_master WHERE type='table' AND (name='settings');`,identifyValue:`1`,queries:[{name:`Windows Your Phone Settings Database`,query:`SELECT
phone_apps.app_name AS 'Application Name',
phone_apps.package_name AS 'Package Name',
phone_apps.version AS 'Version',
settings.setting_group_id AS 'GroupID',
CASE

WHEN settings.setting_value = 1 THEN
'On' ELSE 'Off'
END AS 'Settings Value',
settings.setting_type AS 'Settings Type',
settings.setting_key AS 'Settings Key',
settings.setting_group_id AS 'Group ID'
FROM
phone_apps
LEFT JOIN settings ON settings.setting_key = phone_apps.package_name
ORDER BY
phone_apps.app_name ASC
`,baseFileName:`SettingsDB`,blobColumns:[]}]}];export{e as SQL_MAPS};