#!/usr/bin/env python3
#coding: utf-8
#
# generate GB/T 24589.1 json
#
# designed by SAMBUICHI, Nobuyuki (Sambuichi Professional Engineers Office)
# written by SAMBUICHI, Nobuyuki (Sambuichi Professional Engineers Office)
#
# MIT License
#
# Copyright (c) 2021 SAMBUICHI Nobuyuki (Sambuichi Professional Engineers Office)
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
import os
import argparse
import json

module = {
    "1": "Public Archives",
    "2": "General Ledger",
    "3": "Receivable and Payable Account",
    "4": "PPE",
    "5": "Employee Payroll"
}

table = {
    "1-01": {
        "name": "Electronic Books",
        "field": {
            "010101": "Number of Electronic Book",
            "010102": "Name of Electronic Book",
            "010103": "Accounting Entity",
            "010104": "Organization Code",
            "010105": "Organization Type",
            "010106": "Industry",
            "010107": "Name of Developer",
            "010108": "Software Version",
            "010109": "Functional Currency",
            "010110": "Fiscal Year",
            "010111": "Standard Version"
        }
    },
    "1-02": {
        "name": "Accounting Period",
        "field": {
            "010110": "Fiscal Year",
            "010201": "Number of Accounting Period",
            "010202": "Opening Date of Accounting Period",
            "010203": "Closing Date of Accounting Period"
        }
    },
    "1-03": {
        "name": "Type of Voucher",
        "field": {
            "010301": "Number of Journal Entry Type",
            "010302": "Name of Journal Entry Type",
            "010303": "Abbreviation of Journal Entry Type"
        }
    },
    "1-04": {
        "name": "Type of Exchange Rate",
        "field": {
            "010401": "Code of Exchange Rate Type",
            "010402": "Name of Exchange Rate Type"
        }
    },
    "1-05": {
        "name": "Currency",
        "field": {
            "010501": "Currency Code",
            "010502": "Currency Name"
        }
    },
    "1-06": {
        "name": "Settlement Way",
        "field": {
            "010601": "Code of Settlement Method",
            "010602": "Name of Settlement Method"
        }
    },
    "1-07": {
        "name": "Department File",
        "field": {
            "010701": "Department Code",
            "010702": "Department Name",
            "010703": "Code of Superior Department"
        }
    },
    "1-08": {
        "name": "Employee File",
        "field": {
            "010801": "Employee Code",
            "010802": "Employee Name",
            "010803": "ID Name",
            "010804": "ID Number",
            "010805": "Gender",
            "010806": "D.O.B",
            "010701": "Department Code",
            "010807": "Date of Employment",
            "010808": "Resignation Date"
        }
    },
    "1-09": {
        "name": "Supplier File",
        "field": {
            "010901": "Supplier Code",
            "010902": "Supplier Name",
            "010903": "Supplier Abbreviation"
        }
    },
    "1-10": {
        "name": "Client File",
        "field": {
            "011001": "Customer Number",
            "011002": "Customer Name",
            "011003": "Customer Abbreviation"
        }
    },
    "1-11": {
        "name": "Custom File Entries",
        "field": {
            "011101": "Segment Code",
            "011102": "Segment Name",
            "011103": "Segment Description",
            "011104": "Hierarchy Features",
            "011105": "Rule of File Encoding"
        }
    },
    "1-12": {
        "name": "Custom File Value",
        "field": {
            "011101": "Segment Code",
            "011201": "Code of File Content",
            "011202": "Name of File Content",
            "011203": "Description of File Content",
            "011204": "Parent Code of File Content",
            "011205": "Hierarchy of File Content"
        }
    },
    "2-01": {
        "name": "Basic Information of General Ledger",
        "field": {
            "020101": "Structure Separator",
            "020102": "Rules of Accounts Encoding",
            "020103": "Rules of Cash-flow-item Encoding",
            "020104": "Extensible Field Structure of Document",
            "020105": "Corresponding Segment of Extensible Structure of Document",
            "020106": "Extensible Field Structure of Entry",
            "020107": "Corresponding Segment of Extensible Structure of Entry"
        }
    },
    "2-02": {
        "name": "Accounting Course",
        "field": {
            "020201": "Account Number",
            "020202": "Account Name",
            "020203": "Hierarchy of Account",
            "020204": "Account Type",
            "020205": "Debit or Credit Balance"
        }
    },
    "2-03": {
        "name": "Subject Assistant Accounting",
        "field": {
            "020201": "Account Number",
            "020301": "Number of Subsidiary Item",
            "020302": "Name of Subsidiary Item",
            "020303": "Corresponding File",
            "020304": "Description of Subsidiary Item"
        }
    },
    "2-04": {
        "name": "Cash Flow Project",
        "field": {
            "020401": "Code of Cash Flow Item",
            "020402": "Name of Cash Flow Item",
            "020403": "Description of Cash Flow Item",
            "020404": "Bottom of Hierarchy",
            "020405": "Hierarchy of Cash Flow Item",
            "020406": "Parent of Cash Flow Item",
            "020407": "Data Source of Cash Flow",
            "020408": "Property of Cash Flow Item"
        }
    },
    "2-05": {
        "name": "Account Balance and Occurrence",
        "field": {
            "020201": "Account Number",
            "020301": "Number N of Subsidiary Item",
            "020501": "Opening Balance Debit or Credit",
            "020502": "Closing Balance Debit or Credit",
            "010501": "Currency Code",
            "020503": "Measurement Unit",
            "010110": "Fiscal Year",
            "010201": "Number of Accounting Period",
            "020504": "Amount of Beginning Balance",
            "020505": "Beginning Balance of Local Currency",
            "020506": "Beginning Balance of Functional Currency",
            "020507": "Debit Amount",
            "020508": "Debit Amount of Local Currency",
            "020509": "Debit Amount of Functional Currency",
            "020510": "Credit Amount",
            "020511": "Credit Amount of Local Currency",
            "020512": "Credit Amount of Functional Currency",
            "020513": "Amount of Ending Balance",
            "020514": "Ending Balance of Local Currency",
            "020515": "Ending Balance of Functional Currency"
        }
    },
    "2-06": {
        "name": "Account Voucher",
        "field": {
            "020601": "Date of Journal Entry",
            "010110": "Fiscal Year",
            "010201": "Number of Accounting Period",
            "010301": "Number of Journal Entry Type",
            "020602": "Number of Journal Entry",
            "020603": "Line Number of Journal Entry",
            "020604": "Summary of Journal Entry",
            "020201": "Account Number",
            "020301": "Number N of Subsidiary Item",
            "010501": "Currency Code",
            "020503": "Measurement Unit",
            "020507": "Debit Amount",
            "020508": "Debit Amount of Local Currency",
            "020509": "Debit Amount of Functional Currency",
            "020510": "Credit Amount",
            "020511": "Credit Amount of Local Currency",
            "020512": "Credit Amount of Functional Currency",
            "010401": "Code of Exchange Rate Type",
            "020605": "Exchange Rate",
            "020606": "Unit Price",
            "020607": "Value of Extensible Field Structure of Document",
            "020608": "Value of Extensible Field Structure of Entry",
            "010601": "Code of Settlement Method",
            "020609": "Document Type",
            "020610": "Document Number",
            "020611": "Document Date",
            "020612": "Number of Attachments",
            "020613": "Accountant Preparing Document",
            "020614": "Accountant Verifying Document",
            "020615": "Accountant in Charge of Entering",
            "020616": "Sign of Entering",
            "020617": "Sign of Cancellation",
            "020618": "Source Module of Journal Entry"
        }
    },
    "2-07": {
        "name": "Cash Flow Document Item Data",
        "field": {
            "010301": "Number of Journal Entry Type",
            "020602": "Number of Journal Entry",
            "010501": "Currency Code",
            "020701": "Line Number of Cash Flow",
            "020702": "Summary of Cash Flow",
            "020401": "Rules of Cash-flow-item Encoding",
            "020408": "Property of Cash Flow Item",
            "020703": "Cash Flow Amount of Local Currency",
            "020704": "Cash Flow Amount of Functional Currency"
        }
    },
    "2-08": {
        "name": "Report Set",
        "field": {
            "020801": "Statement Number",
            "020802": "Statement Name",
            "020803": "Date of Statement",
            "020804": "Reporting Period of Statement",
            "020805": "Accounting Entity",
            "020806": "Currency unit"
        }
    },
    "2-09": {
        "name": "Report Item Data",
        "field": {
            "020801": "Statement Number",
            "020901": "Number of Statement Item",
            "020902": "Name of Statement Item",
            "020903": "Formula of Statement Item",
            "020904": "Amount of Statement Item"
        }
    },
    "3-01": {
        "name": "Type of Document",
        "field": {
            "030101": "Code of Document Type",
            "030102": "Name of Document Type"
        }
    },
    "3-02": {
        "name": "Type of Transaction",
        "field": {
            "030201": "Code of Transaction Type",
            "030202": "Name of Transaction Type"
        }
    },
    "3-03": {
        "name": "Statement of Receivable Account",
        "field": {
            "011001": "Customer Number",
            "020201": "Account Number",
            "020601": "Date of Journal Entry",
            "030301": "Entering Date",
            "010110": "Fiscal Year",
            "010201": "Number of Accounting Period",
            "010301": "Number of Journal Entry Type",
            "020602": "Number of Journal Entry",
            "010109": "Functional Currency",
            "020605": "Exchange Rate",
            "020205": "Debit or Credit Balance",
            "030302": "Balance of Functional Currency",
            "030303": "Balance of Local Currency",
            "030304": "Debit or Credit Amount of Functional Currency",
            "030305": "Name of Local Currency",
            "030306": "Debit or Currency ,CreditAmount of,Local",
            "030307": "Summary",
            "030308": "Due Date",
            "030309": "Number of Write-Off Journal Entry",
            "030310": "Write-Off Date",
            "030101": "Code of Document Type",
            "030201": "Code of Transaction Type",
            "030311": "Document Number",
            "030312": "Invoice Number",
            "030313": "Contract Number",
            "030314": "Item Code",
            "010601": "Code of Settlement Method",
            "030315": "Payment Date",
            "030316": "Write-Off Sign",
            "030317": "Draft Number"
        }
    },
    "3-04": {
        "name": "Statement of Payable Account",
        "field": {
            "010901": "Supplier Code",
            "020201": "Account Number",
            "020601": "Date of Journal Entry",
            "030301": "Entering Date",
            "010110": "Fiscal Year",
            "010201": "Number of Accounting Period",
            "010301": "Number of Journal Entry Type",
            "020602": "Number of Journal Entry",
            "010109": "Functional Currency",
            "020605": "Exchange Rate",
            "020205": "Debit or Credit Balance",
            "030302": "Balance of Functional Currency",
            "030303": "Balance of Local Currency",
            "030304": "Debit or Credit Amount of Functional Currency",
            "030305": "Name of Local Currency",
            "030306": "Debit or Credit Amount of Local Currency",
            "030307": "Summary",
            "030308": "Due Date",
            "030309": "Number of Write-Off Journal Entry",
            "030310": "Write-Off Date",
            "030101": "Code of Document Type",
            "030201": "Code of Transaction Type",
            "030311": "Document Number",
            "030312": "Invoice Number",
            "030313": "Contract Number",
            "030314": "Item Code",
            "010601": "Code of Settlement Method",
            "030315": "Payment Date",
            "030316": "Write-Off Sign",
            "030317": "Draft Number"
        }
    },
    "4-01": {
        "name": "Basic Information of PPE",
        "field": {
            "040101": "Number of PPE Reconciliation Account",
            "040102": "Number of PPE Impairment Provision Reconciliation Account",
            "040103": "Number of Accumulated Depreciation Reconciliation Account"
        }
    },
    "4-02": {
        "name": "Category Setting of PPE",
        "field": {
            "040201": "Encoding Rules of PPE Categories",
            "040202": "Code of PPE Category",
            "040203": "Name of PPE Category"
        }
    },
    "4-03": {
        "name": "Change mode of PPE",
        "field": {
            "040301": "Code of Change Mode in PPE",
            "040302": "Name of Change Mode in PPE"
        }
    },
    "4-04": {
        "name": "Depreciation Method of PPE",
        "field": {
            "040401": "Code of Depreciation Method",
            "040402": "Name of Depreciation Method",
            "040403": "Depreciation Formula"
        }
    },
    "4-05": {
        "name": "Use Status of PPE",
        "field": {
            "040501": "Code of PPE Condition",
            "040502": "Name of PPE Condition"
        }
    },
    "4-06": {
        "name": "PPE Card",
        "field": {
            "040601": "Card Number of PPE",
            "040202": "Code of PPE Category",
            "040602": "PPE Number",
            "040603": "PPE Name",
            "040604": "Entering Date of PPE",
            "010201": "Number of Accounting Period",
            "040605": "PPE Measurement Unit",
            "040606": "Quantity of PPE",
            "040301": "Code of Change Mode in PPE",
            "040401": "Code of Depreciation Method",
            "040501": "Code of PPE Condition",
            "040607": "Expected Durable Months of PPE",
            "040608": "Depreciated Months",
            "010109": "Functional Currency",
            "040609": "Historical Cost of PPE",
            "040610": "Accumulated Depreciation of PPE",
            "040611": "Carrying Amount of PPE",
            "040612": "Accumulated Impairment Provision of PPE",
            "040613": "Net Residual Value Ratio of PPE",
            "040614": "Net Residual Value of PPE",
            "040615": "Monthly Depreciation Ratio of PPE",
            "040616": "Monthly Depreciation of PPE",
            "040617": "PPE Capacity Unit",
            "040618": "Total PPE Capacity",
            "040619": "Accumulated Usage of PPE Capacity",
            "040101": "Number of PPE Reconciliation Account",
            "040102": "Number of PPE Impairment Provision Reconciliation Account",
            "040103": "Number of Accumulated Depreciation Reconciliation Account"
        }
    },
    "4-07": {
        "name": "Physical Information of PPE Card",
        "field": {
            "040601": "Card Number of PPE",
            "010201": "Number of Accounting Period",
            "040701": "Tag Number of PPE",
            "040702": "Location of PPE",
            "040703": "Specification Model of PPE"
        }
    },
    "4-08": {
        "name": "Use Information of PPE Card",
        "field": {
            "040601": "Card Number of PPE",
            "040701": "Tag Number of PPE",
            "010201": "Number of Accounting Period",
            "010701": "Department Code",
            "040801": "Depreciation Allocation Proportion"
        }
    },
    "4-09": {
        "name": "Reduction of PPE",
        "field": {
            "040901": "Serial Number of PPE Decrement",
            "040902": "Date of PPE Decrement",
            "010201": "Number of Accounting Period",
            "040301": "Code of Change Mode in PPE",
            "040601": "Card Number of PPE",
            "040603": "PPE Name",
            "040602": "PPE Number",
            "040903": "Amount of PPE Decrement",
            "040904": "Decrement of PPE Historical Cost",
            "040905": "Decrement of PPE Accumulated Depreciation",
            "040906": "Impairment Provision of Decrement of PPE",
            "040907": "Residual Value of Decrement of PPE",
            "040908": "Revenue of PPE Disposal",
            "040909": "Expense of PPE Disposal",
            "040910": "Reason for PPE Decrement"
        }
    },
    "4-10": {
        "name": "Physical Information of PPE Reduction",
        "field": {
            "040901": "Serial Number of PPE Decrement",
            "040601": "Card Number of PPE",
            "040701": "Tag Number of PPE",
            "010201": "Number of Accounting Period"
        }
    },
    "4-11": {
        "name": "Change Information of PPE Reduction",
        "field": {
            "041101": "Serial Number of Changes in PPE",
            "041102": "Date of Changes in PPE",
            "010201": "Number of Accounting Period",
            "040601": "Card Number of PPE",
            "040602": "PPE Number",
            "040603": "PPE Name",
            "040301": "Code of Change Mode in PPE",
            "040701": "Tag Number of PPE",
            "041103": "Method or Value before Changes in PPE",
            "041104": "Method or Value after Changes in PPE",
            "041105": "Reason for Changes in PPE"
        }
    },
    "5-01": {
        "name": "Payroll Period",
        "field": {
            "050101": "Payroll Year",
            "050102": "Number of Payroll Period",
            "050103": "Beginning Date of Payroll Period",
            "050104": "Ending Date of Payroll Period"
        }
    },
    "5-02": {
        "name": "Payroll Item",
        "field": {
            "050201": "Name of Payroll Category",
            "050202": "Code of Payroll Item",
            "050203": "Name of Payroll Item"
        }
    },
    "5-03": {
        "name": "Employee Compensation Record",
        "field": {
            "010801": "Employee Code",
            "050301": "Employee Type",
            "010701": "Department Code",
            "050201": "Name of Payroll Category",
            "050101": "Payroll Year",
            "050102": "Number of Payroll Period",
            "010110": "Fiscal Year",
            "010201": "Number of Accounting Period",
            "010501": "Currency Code"
        }
    },
    "5-04": {
        "name": "Employee Pay Record Detail",
        "field": {
            "010801": "Employee Code",
            "050201": "Name of Payroll Category",
            "050101": "Payroll Year",
            "050102": "Number of Payroll Period",
            "050202": "Code of Payroll Item",
            "050401": "Payroll Amount"
        }
    }
}

element = {
    "010101": { "name": "Number of Electronic Book",
        "description": "The number of the current electronic book in accounting software",
        "indication": "C..60"
    },
    "010102": { "name": "Name of Electronic Book",
        "description": "The name of the current electronic book in accounting software",
        "indication": "C..200"
    },
    "010103": { "name": "Accounting Entity",
        "indication": "C..200",
        "note": "The legal name of accounting entity"
    },
    "010104": { "name": "Organization Code",
        "description": "The organization code of enterprises and undertakings",
        "indication": "C..20",
        "note": "prepared in accordance with the requirements of GB 11714-1997"
    },
    "010105": { "name": "Organization Type",
        "description": "Labeled as either 'enterprise' or 'undertaking'",
        "indication": "C8"
    },
    "010106": { "name": "Industry",
        "description": "The corresponding industry name under superior sector code",
        "indication": "C..20",
        "note": "Prepared in accordance with GB/T 4754"
    },
    "010107": { "name": "Name of Developer",
        "description": "The name of software developer",
        "indication": "C..200"
    },
    "010108": { "name": "Version",
        "description": "The version number of accounting software",
        "indication": "C..20"
    },
    "010109": { "name": "Functional Currency",
        "description": "The recording currency used in financial accounting of software",
        "indication": "C..30",
        "note": "Indicated according to GB/T 12406-2008"
    },
    "010110": { "name": "Fiscal Year",
        "description": "The year of the current financial statement",
        "indication": "C4",
        "note": "e.g. '2010'"
    },
    "010111": { "name": "Standard Version",
        "description": "The standard issuing no. of the standards with which the current output files are consistent",
        "indication": "C..30"
    },
    "010201": { "name": "Number of Accounting Period",
        "description": "The number of accounting period according to accounting standard",
        "indication": "C..15",
        "note": "Which support adjustment, such as the first adjustment of the 12th month, expressed as '1201'"
    },
    "010202": { "name": "Opening Date of Accounting Period",
        "description": "The calendar opening date of the current accounting period",
        "indication": "C8",
        "note": "'YYYYMMDD' according to the ISO 8601:2000"
    },
    "010203": { "name": "Closing Date of Accounting Period",
        "explanation": "The calendar closing date of the current accounting period",
        "indication": "C8",
        "note": "'YYYYMMDD' according to the ISO 8601:2000"
    },
    "010301": { "name": "Number of Journal Entry Type",
        "description": "The number of journal entry type",
        "indication": "C..60"
    },
    "010302": { "name": "Name of Journal Entry Type",
        "description": "The name of journal entry type",
        "indication": "C..60",
        "note": "e.g. 'journal entry type'"
    },
    "010303": { "name": "Abbreviation of Journal Entry Type",
        "description": "The abbreviation of journal entry type",
        "indication": "C..20",
        "note": "e.g., 'ji' or 'zi' in some units of china"
    },
    "010401": { "name": "Code of Exchange Rate Type",
        "description": "The type code of exchange rate of the base currency to a target currency",
        "indication": "C..60"
    },
    "010402": { "name": "Name of Exchange Rate Type",
        "description": "The type name of exchange rate of the base currency to a target currency",
        "indication": "C..60",
        "note": "e.g., 'buying rate', 'selling rate' etc."
    },
    "010501": { "name": "Currency Code",
        "description": "The currency code",
        "indication": "C..10",
        "note": "According to the ISO 4217:2001"
    },
    "010502": { "name": "Name of Currency",
        "description": "The type name of currency concerned in accounting",
        "indication": "C..30",
        "note": "According to the GB/T 12406-2008"
    },
    "010601": { "name": "Code of Settlement Method",
        "description": "The code of the form of funds settlement",
        "indication": "C..60"
    },
    "010602": { "name": "Name of Settlement Method",
        "description": "The name of the form of funds settlement",
        "indication": "C..60"
    },
    "010701": { "name": "Department Code",
        "description": "The code of internal department",
        "indication": "C..60"
    },
    "010702": { "name": "Department Name",
        "description": "The name of internal department",
        "indication": "C..200"
    },
    "010703": { "name": "Code of Superior Department",
        "description": "The code of superior department of the corresponding department",
        "indication": "C..60"
    },
    "010801": { "name": "Employee Code",
        "description": "The code of employee",
        "indication": "C..60"
    },
    "010802": { "name": "Employee Name",
        "description": "The name of employee",
        "indication": "C..30"
    },
    "010803": { "name": "ID Name",
        "description": "The name of valid certificate as a proof of the identity of the employee",
        "indication": "C..30",
        "note": "e.g., 'ID', 'certificate of officers' and 'passport', etc.. One can choose any one if he has more valid certificates at the same time"
    },
    "010804": { "name": "ID Number",
        "description": "The number of employee's valid certificate",
        "indication": "C..30"
    },
    "010805": { "name": "Gender",
        "description": "The employee's gender",
        "indication": "C..20"
    },
    "010806": { "name": "D.O.B",
        "description": "The date of employee's birth",
        "indication": "C8",
        "note": "'YYYYMMDD' according to the ISO 8601:2000"
    },
    "010807": { "name": "Date of Employment",
        "description": "The employment date of employee",
        "indication": "C8",
        "note": "'YYYYMMDD' according to the ISO 8601:2000"
    },
    "010808": { "name": "Resignation Date",
        "description": "The resignation date of employee",
        "indication": "C8",
        "note": "'YYYYMMDD' according to the ISO 8601:2000"
    },
    "010901": { "name": "Supplier Code",
        "description": "Explanation: The code of supplier",
        "indication": "C..60"
    },
    "010902": { "name": "Supplier Name",
        "description": "The supplier's full name",
        "indication": "C..200"
    },
    "010903": { "name": "Supplier Abbreviation",
        "description": "The abbreviated form of supplier's name",
        "indication": "C..60"
    },
    "011001": { "name": "Customer Number",
        "description": "The number of customer",
        "indication": "C..60"
    },
    "011002": { "name": "Customer Name",
        "description": "The full name of customer",
        "indication": "C..200"
    },
    "011003": { "name": "Customer Abbreviation",
        "description": "The abbreviation of customer's name",
        "indication": "C..60"
    },
    "011101": { "name": "Segment Code",
        "description": "The code of other segment which electronic booking needs to use",
        "indication": "C..60",
        "note": "This does not include the fixed files having been identified, such as 'department' and 'customer'"
    },
    "011102": { "name": "Segment Name",
        "description": "The segment name which electronic booking need to use",
        "indication": "C..200"
    },
    "011103": { "name": "Segment Description",
        "description": "The segment description which electronic booking needs to use",
        "indication": "C..1000"
    },
    "011104": { "name": "Hierarchy Feature",
        "description": "Whether the file value having a hierarchy feature or not",
        "indication": "C1",
        "note": "'1' means 'yes', '0' means 'no'"
    },
    "011105": { "name": "Rule of File Encoding",
        "description": "The encoding rules of customer defined file",
        "indication": "C..200",
        "note": "If the encoding rules have hierarchy feature , the number of each level is separated by '-', such as'1-2-2-2'"
    },
    "011201": { "name": "Code of File Content",
        "description": "The code of content value of each file",
        "indication": "C..60"
    },
    "011202": { "name": "Name of File Content",
        "description": "The name of content value of each file",
        "indication": "C..200"
    },
    "011203": { "name": "Description of File Content",
        "description": "The detailed description of the file content",
        "indication": "C..1000"
    },
    "011204": { "name": "Parent Code of File Content",
        "description": "the parent code of file content",
        "indication": "C..60",
        "note": "Referred to [Code of File Content], if there are encoding rules, parent code is automatically brought out, otherwise the hierarchical relationship is exported"
    },
    "011205": { "name": "Hierarchy of File Content",
        "description": "The level of the current value in the file structure",
        "indication": "C..2",
        "note": "'1' means 'no hierarchy feature'"
    },
    "020101": { "name": "Structure Separator",
        "description": "The structure separator of subsidiary account and extended field",
        "indication": "C1",
        "note": "e.g. '-'"
    },
    "020102": { "name": "Rules of Accounts Encoding",
        "description": "The code of account corresponding to each level is separated by '-'",
        "indication": "C..200",
        "note": "e.g., '4-2-2' or '4-3-4'"
    },
    "020103": { "name": "Rules of Cash-flow-item Encoding",
        "description": "The code of item corresponding to each level is separated by '-'",
        "indication": "C..200",
        "note": "e.g., '4-2-2' or '4-3-4'"
    },
    "020104": { "name": "Extensible Field Structure of Document",
        "description": "The users can customize the additional field of the important information for the document if needed. It can be the combination of multiple extended field, or it can be null",
        "indication": "C..2000",
        "note": "e.g., 'the date of transaction', up to 30 fields"
    },
    "020105": { "name": "Corresponding Segment of Extensible Structure of Document",
        "description": "The corresponding file for each extended field of document. It can be multiple extended fields corresponding to the same record, or it can be no file (null)",
        "indication": "C..2000"
    },
    "020106": { "name": "Extensible Field Structure of Entry",
        "description": "The users can customize the additional field of the important information for the entry if needed. It can be the combination of multiple extended field, or it can be null",
        "indication": "C..2000",
        "note": "e.g., 'settlement method - notes type - the serials number of notes - the date of notes', up to 30 fields"
    },
    "020107": { "name": "Corresponding Segment of Extensible Structure of Entry",
        "description": "The corresponding file for each extended field of entry. It can be multiple extended fields corresponding to the same record, or it can be no file (null)",
        "indication": "C..2000",
        "note": "e.g., 'record of settlement method - record of notes type - null - null'"
    },
    "020201": { "name": "Account Number",
        "indication": "C..60",
        "note": "The categorized code of each account, according to the accounting rules and business properties"
    },
    "020202": { "name": "Account Name",
        "description": "The corresponding account name of the account code at the bottom level",
        "indication": "C..60",
        "note": "e.g. 'personal income tax payable'"
    },
    "020203": { "name": "Hierarchy of Account",
        "explanation": "The corresponding level for account code in the account hierarchy",
        "indication": "I..2"
    },
    "020204": { "name": "Account Type",
        "description": "The type of account",
        "indication": "C..20",
        "note": "e.g., 'assets', 'liabilities', 'the shareholder and owner's equity', 'cost' and 'profit and loss', etc."
    },
    "020205": { "name": "Debit or Credit Balance",
        "description": "Debit or credit balance",
        "indication": "C..4",
        "note": "e.g., 'credit' or 'debit'"
    },
    "020301": { "name": "Number of Subsidiary Item",
        "description": "Explanation: The number of subsidiary item",
        "indication": "C..60"
    },
    "020302": { "name": "Name of Subsidiary Item",
        "description": "Explanation: The name of subsidiary item",
        "indication": "C..200"
    },
    "020303": { "name": "Corresponding File",
        "description": "The file corresponding to subsidiary item",
        "indication": "C..200",
        "note": "e.g., 'department file', 'employee file', 'supplier file', 'customer file', 'name of customer defined file'"
    },
    "020304": { "name": "Description of Subsidiary Item",
        "description": "The detailed description of subsidiary item",
        "indication": "C..2000"
    },
    "020401": { "name": "Code of Cash Flow Item",
        "description": "The code of cash flow item",
        "indication": "C..60"
    },
    "020402": { "name": "Name of Cash Flow Item",
        "description": "The name of cash flow item",
        "indication": "C..200"
    },
    "020403": { "name": "Description of Cash Flow Item",
        "description": "The detailed description of cash flow item",
        "indication": "C..2000"
    },
    "020404": { "name": "Bottom of Hierarchy",
        "description": "Whether at the bottom of hierarchy",
        "indication": "C1",
        "note": "1' means 'yes', '0' means 'no'"
    },
    "020405": { "name": "Hierarchy of Cash Flow Item",
        "description": "The level of current cash flow item",
        "indication": "C..2"
    },
    "020406": { "name": "Parent of Cash Flow Item",
        "description": "The parent code of cash flow item",
        "indication": "C..60"
    },
    "020407": { "name": "Data Source of Cash Flow",
        "indication": "C1",
        "note": "The data source of the cash flow item, e.g., the main statement or subsidiary statement. '1' means 'the main statement', '0' means 'the subsidiary statement'"
    },
    "020408": { "name": "Property of Cash Flow Item",
        "description": "The property of the cash flow item",
        "indication": "C1",
        "note": "'1' means 'inflow', '0' means 'outflow', '2' means 'unable to confirm'"
    },
    "020501": { "name": "Opening Balance Debit or Credit",
        "description": "The opening balance of debit or credit direction for the account",
        "indication": "C..4",
        "note": "e.g., 'debit', 'credit'"
    },
    "020502": { "name": "Closing Balance Debit or Credit",
        "description": "The ending balance of debit or credit direction for the account",
        "indication": "C..4",
        "note": "e.g., 'debit', 'credit'"
    },
    "020503": { "name": "Measurement Unit",
        "description": "The physical measurement scale",
        "indication": "C..10"
    },
    "020504": { "name": "Amount of Beginning Balance",
        "indication": "D20.6",
        "note": "The beginning balance amount of the account"
    },
    "020505": { "name": "Beginning Balance of Local Currency",
        "description": "The beginning local currency balance of the account",
        "indication": "D20.2"
    },
    "020506": { "name": "Beginning Balance of Functional Currency",
        "explanation": "The beginning functional currency balance of the account",
        "indication": "D20.2"
    },
    "020507": { "name": "Debit Amount",
        "indication": "D20.6",
        "note": "The debit amount"
    },
    "020508": { "name": "Debit Amount of Local Currency",
        "indication": "D20.2",
        "note": "The debit amount of local currency"
    },
    "020509": { "name": "Debit Amount of Functional Currency",
        "indication": "D20.2",
        "note": "The debit amount of functional currency"
    },
    "020510": { "name": "Credit Amount",
        "indication": "D20.6",
        "note": "The credit amount"
    },
    "020511": { "name": "Credit Amount of Local Currency",
        "indication": "D20.2",
        "note": "The credit amount of local currency"
    },
    "020512": { "name": "Credit Amount of Functional Currency",
        "indication": "D20.2",
        "note": "The credit amount of functional currency"
    },
    "020513": { "name": "Amount of Ending Balance",
        "description": "The amount of ending balance",
        "indication": "D20.6"
    },
    "020514": { "name": "Ending Balance of Local Currency",
        "description": "The ending balance of local currency",
        "indication": "D20.2"
    },
    "020515": { "name": "Ending Balance of Functional Currency",
        "description": "The ending balance of functional currency",
        "indication": "D20.2"
    },
    "020601": { "name": "Date of Journal Entry",
        "description": "The date of making of journal entry",
        "indication": "C8",
        "note": "'YYYYMMDD' according to the ISO 8601:2000"
    },
    "020602": { "name": "Number of Journal Entry",
        "explanation": "The sequential number of journal entry",
        "indication": "C..60"
    },
    "020603": { "name": "Line Number of Journal Entry",
        "explanation": "The sequential number of a line of a journal entry",
        "indication": "C..5"
    },
    "020604": { "name": "Summary of Journal Entry",
        "description": "A brief description of the business journal entry",
        "indication": "C..300"
    },
    "020605": { "name": "Exchange Rate",
        "description": "The exchange rate",
        "indication": "D13.4"
    },
    "020606": { "name": "Unit Price",
        "description": "The price per unit",
        "indication": "D20.4"
    },
    "020607": { "name": "Value of Extensible Field Structure of Document",
        "description": "The value defined by user in current document header; user-defined fields value of present voucher head",
        "indication": "C..300"
    },
    "020608": { "name": "Value of Extensible Field Structure of Entry",
        "explanation": "The field value of the current line defined by users; user-defined fields value of present journalizing; self-presentation field value of entry line",
        "indication": "C..300"
    },
    "020609": { "name": "Document Type",
        "description": "The document type",
        "indication": "C..60",
        "note": "e.g., 'bill', 'receipts'"
    },
    "020610": { "name": "Document Number",
        "description": "The serial number of document",
        "indication": "C..60"
    },
    "020611": { "name": "Document Date",
        "description": "The document date",
        "indication": "C8",
        "note": "'YYYYMMDD' according to the ISO 8601:2000"
    },
    "020612": { "name": "Number of Attachments",
        "description": "The number of attachments",
        "indication": "I..4"
    },
    "020613": { "name": "Accountant Preparing Document",
        "description": "The accountant preparing document",
        "indication": "C..30"
    },
    "020614": { "name": "Accountant Verifying Document",
        "description": "The accountant verifying document",
        "indication": "C..30"
    },
    "020615": { "name": "Accountant in Charge of Entering",
        "description": "The accountant in charge of entering",
        "indication": "C..30"
    },
    "020616": { "name": "Sign of Entering",
        "description": "The sign of entering",
        "indication": "C1",
        "note": "'0' means 'not booking', '1' means 'entering'"
    },
    "020617": { "name": "Sign of Cancellation",
        "description": "The sign of cancellation for journal entry already formed but not yet posted",
        "indication": "C1",
        "note": "'1' means 'cancelled', '0' means 'not cancelled'"
    },
    "020618": { "name": "Source Module of Journal Entry",
        "description": "The name of source module of journal entry",
        "indication": "C..20",
        "note": "e.g., 'null' for 'general ledger', others for 'receivables', 'payables', 'salary', 'fixed assets', etc."
    },
    "020701": { "name": "Line Number of Cash Flow",
        "description": "The sequential line number of cash flow",
        "indication": "C..20"
    },
    "020702": { "name": "Summary of Cash Flow",
        "description": "A brief description of the operating cash flow",
        "indication": "C..300"
    },
    "020703": { "name": "Cash Flow Amount of Local Currency",
        "description": "The cash flow amount of local currency",
        "indication": "D20.2"
    },
    "020704": { "name": "Cash Flow Amount of Functional Currency",
        "description": "The cash flow amount of functional currency",
        "indication": "D20.2"
    },
    "020801": { "name": "Statement Number",
        "description": "The unique of statement",
        "indication": "C..20"
    },
    "020802": { "name": "Statement Name",
        "description": "The name of external statement",
        "indication": "C..60",
        "note": "e.g., 'statement of financial position', 'statement of comprehensive income', 'statement of cash flow', 'statement of shareholder equity"
    },
    "020803": { "name": "Date of Statement",
        "description": "The date of statement",
        "indication": "C8",
        "note": "'YYYYMMDD' according to the ISO 8601:2000"
    },
    "020804": { "name": "Reporting Period of Statement",
        "description": "The reporting period of statement",
        "indication": "C..6",
        "note": "e.g., the reporting period of the statement of comprehensive income is '2008', the reporting period of the report in December 2008 is '200812'"
    },
    "020805": { "name": "Accounting Entity",
        "description": "The accounting entity",
        "indication": "C..200"
    },
    "020806": { "name": "Currency Unit",
        "description": "The currency unit",
        "indication": "C..30",
        "note": "e.g. 1 thousand"
    },
    "020901": { "name": "Number of Statement Item",
        "description": "The sequential number of statement item",
        "indication": "C..20"
    },
    "020902": { "name": "Name of Statement Item",
        "description": "The name of statement item",
        "indication": "C..200"
    },
    "020903": { "name": "Formula of Statement Item",
        "description": "The formula of statement items, such as reconciliation",
        "indication": "C..2000"
    },
    "020904": { "name": "Amount of Statement Item",
        "description": "The amount of statement item",
        "indication": "D20.2"
    },
    "030101": { "name": "Number of Document Type",
        "description": "The serial number of document type",
        "indication": "C..60"
    },
    "030102": { "name": "Name of Document Type",
        "description": "The name of document type",
        "indication": "C..60"
    },
    "030201": { "name": "Code of Transaction Type",
        "description": "The code of transaction type",
        "indication": "C..60",
        "note": "The transaction type is a refinement of the document type, different types of transactions reflect different rules and processing procedures in business"
    },
    "030202": { "name": "Name of Transaction Type",
        "description": "The name of transaction type",
        "indication": "C..60"
    },
    "030301": { "name": "Entering Date",
        "description": "The entering date of accounting documents generated in receivable/receipts business or payable/payment business",
        "indication": "C8",
        "note": "'YYYYMMDD' according to the GB/T 7408-2005"
    },
    "030302": { "name": "Balance of Functional Currency",
        "description": "The balance of receivables, payables or collection business and payment which measured in functional currency",
        "indication": "D20.2"
    },
    "030303": { "name": "Balance of Local Currency",
        "description": "The balance of account receivables or payables which is calculated in local currency",
        "indication": "D20.2"
    },
    "030304": { "name": "Debit or Credit Amount of Functional Currency",
        "description": "The debit or credit amount of business in functional currency",
        "indication": "D20.2"
    },
    "030305": { "name": "Name of Local Currency",
        "description": "The name of local currency",
        "indication": "C..30"
    },
    "030306": { "name": "Debit or Credit Amount of Local Currency",
        "description": "The debit or credit amount of business in local currency",
        "indication": "D20.2",
        "note": "The exchange gains and losses recorded by the local currency may be 0"
    },
    "030307": { "name": "Summary",
        "description": "A brief description of the business",
        "indication": "C..200"
    },
    "030308": { "name": "Due Date",
        "description": "The due date of the account receivable",
        "indication": "C8",
        "note": "If a transaction has more than one due date, it is necessary to export each transaction due date as 'YYYYMMDD'"
    },
    "030309": { "name": "Number of Write-Off Journal Entry",
        "description": "The number of write-off journal entry corresponding to the current transaction",
        "indication": "C..60",
        "note": "1)If the current document is a receivable sheet (invoice), the write-off journal entry is the certification number of the corresponding cash register. If the current document is a receipt note, the write-off journal entry is the certification number of the corresponding note receivable. (2)If a business has been involved in several verification, it is necessary to export corresponding write-off journal entry according to document number"
    },
    "030310": { "name": "Date of Reconciliation",
        "description": "The date of reconciliation of the current business",
        "indication": "C8",
        "note": "'YYYYMMDD' according to the GB/T 7408-2005"
    },
    "030311": { "name": "Number of Document",
        "description": "The serial number of receivables invoices",
        "indication": "C..60"
    },
    "030312": { "name": "Invoice Number",
        "description": "The invoice number of receivables",
        "indication": "C..60"
    },
    "030313": { "name": "Contract Number",
        "description": "The related contract number of the receivables",
        "indication": "C..60"
    },
    "030314": { "name": "Item Number",
        "description": "The recording the related item number of the receivables",
        "indication": "C..60"
    },
    "030315": { "name": "Payment Date",
        "description": "The payment date of the account receivable by the customer",
        "indication": "C8",
        "note": "'YYYYMMDD' according to the ISO 8601:2000"
    },
    "030316": { "name": "Write-Off Sign",
        "description": "The write-off sign of transaction business",
        "indication": "C1",
        "note": "'0' means that it is not written off, '1'means that it has been written off"
    },
    "030317": { "name": "Draft Number",
        "description": "The draft number in settlement",
        "indication": "C..60"
    },
    "040101": { "name": "Number of PPE Reconciliation Account",
        "description": "The number of PPE reconciliation account",
        "indication": "C..60",
        "note": "e.g. '1601'"
    },
    "040102": { "name": "Number of PPE Impairment Provision Reconciliation Account",
        "description": "The number of PPE impairment provision reconciliation account",
        "indication": "C..60",
        "note": "e.g. “1602”"
    },
    "040103": { "name": "Number of Accumulated Depreciation Reconciliation Account",
        "description": "The number of accumulated depreciation reconciliation account",
        "indication": "C..60",
        "note": "e.g. “1603”"
    },
    "040201": { "name": "Encoding Rules of PPE Categories",
        "description": "The encoding rules of PPE categories",
        "indication": "C..60",
        "note": "The code of PPE category corresponding to each level is separated by '-', such as '2-2' or '2-2-2'"
    },
    "040202": { "name": "Code of PPE Category",
        "description": "The code of PPE category",
        "indication": "C..60"
    },
    "040203": { "name": "Name of PPE Category",
        "description": "The name of PPE category",
        "indication": "C..60",
        "note": "e.g., 'building', 'machinery equipment', 'electronic equipment' etc."
    },
    "040301": { "name": "Code of Change Mode in PPE",
        "description": "The code of various change modes of PPE card",
        "indication": "C..60",
        "note": "e.g., '01' means 'purchase', '02' means 'disposal', '03' means 'impairment' , '04' means 'revaluation', '05' means 'change in historical cost', '06' means 'change in accumulated depreciation', etc."
    },
    "040302": { "name": "Name of Change Mode in PPE",
        "description": "The name of various change modes of PPE",
        "indication": "C..60"
    },
    "040401": { "name": "Code of Depreciation Method",
        "description": "The code of various depreciation method",
        "indication": "C..60"
    },
    "040402": { "name": "Name of Depreciation Method",
        "description": "The name of various depreciation method",
        "indication": "C..60",
        "note": "e.g., 'straight line method', ' double decline balance method', 'sum of year-digits method'"
    },
    "040403": { "name": "Depreciation Formula",
        "description": "The depreciation formula",
        "indication": "C..200",
        "note": "e.g., monthly depreciation = historical cost of assets*(1-residual rate)/durable years"
    },
    "040501": { "name": "Code of PPE Condition",
        "description": "The code of usage status of PPE",
        "indication": "C..60"
    },
    "040502": { "name": "Name of PPE Condition",
        "description": "The name of various usage status of PPE",
        "indication": "C..60",
        "note": "e.g., 'in use', 'unused', 'not in use for seasonal factors' etc."
    },
    "040601": { "name": "Card Number of PPE",
        "description": "The number of cards for registration of PPE",
        "indication": "C..60",
        "note": "e.g., 'KP001'or '0001'"
    },
    "040602": { "name": "PPE Number",
        "description": "The number of PPE",
        "indication": "C..60",
        "note": "e.g. 'DYJ-001'"
    },
    "040603": { "name": "PPE Name",
        "description": "The name of PPE",
        "indication": "C..200",
        "note": "e.g. “printer”"
    },
    "040604": { "name": "Entering Date of PPE",
        "description": "The entering date of PPE",
        "indication": "C8",
        "note": "'YYYYMMDD' according to the ISO 8601:2000, e.g. '20090101'"
    },
    "040605": { "name": "PPE Measurement Unit",
        "description": "The measurement unit of PPE",
        "indication": "C..60",
        "note": "e.g. 'unit'"
    },
    "040606": { "name": "Quantity of PPE",
        "description": "The quantity of PPE recorded",
        "indication": "D20.6"
    },
    "040607": { "name": "Expected Durable Months of PPE",
        "description": "The expected service months of PPE",
        "indication": "I..4"
    },
    "040608": { "name": "Depreciated Months",
        "description": "The accumulated months for depreciation of PPE in the current accounting period",
        "indication": "I..4"
    },
    "040609": { "name": "Historical Cost of PPE",
        "description": "The historical cost of PPE",
        "indication": "D20.2"
    },
    "040610": { "name": "Accumulated Depreciation of PPE",
        "description": "The accumulated depreciation of PPE at the current period",
        "indication": "D20.2"
    },
    "040611": { "name": "Carrying Amount of PPE",
        "description": "The carrying amount of PPE at the end of current period",
        "indication": "D20.2"
    },
    "040612": { "name": "Accumulated Impairment Provision of PPE",
        "description": "The accumulated impairment provision of PPE at the end of current period",
        "indication": "D20.2"
    },
    "040613": { "name": "Net Residual Value Ratio of PPE",
        "description": "The net residual value ratio of PPE at the end of current period",
        "indication": "D20.2"
    },
    "040614": { "name": "Net Residual Value of PPE",
        "description": "The net residual value of PPE at the end of current period",
        "indication": "D20.2"
    },
    "040615": { "name": "Monthly Depreciation Ratio of PPE",
        "description": "The monthly depreciation ratio of PPE",
        "indication": "D20.6"
    },
    "040616": { "name": "Monthly Depreciation of PPE",
        "description": "The depreciation of PPE during the current period",
        "indication": "D20.2"
    },
    "040617": { "name": "PPE Capacity Unit",
        "description": "The PPE capacity unit",
        "indication": "C..20"
    },
    "040618": { "name": "Total PPE Capacity",
        "description": "The expected total PPE capacity",
        "indication": "D20.2"
    },
    "040619": { "name": "Accumulated Usage of PPE Capacity",
        "description": "The accumulated total PPE capacity used at the end of the current period",
        "indication": "D20.2"
    },
    "040701": { "name": "Tag Number of PPE",
        "description": "The unique serial number of physical units and a tag number which can be found in a specific kind. If there is only one card number, it can be the same as the asset card number; if more, it should be the number of each kind.",
        "indication": "C..200",
        "note": "e.g., 'BQ-001', 'BQ-002'"
    },
    "040702": { "name": "Location of PPE",
        "description": "The location of physical storage of PPE",
        "indication": "C..60"
    },
    "040703": { "name": "Specification of PPE",
        "description": "The specification of PPE",
        "indication": "C..60"
    },
    "040801": { "name": "Depreciation Allocation Proportion",
        "description": "The depreciation allocation proportion of each department",
        "indication": "D3.2",
        "note": "If PPE is shared by multiple departments, it will be shown in different lines"
    },
    "040901": { "name": "Serial Number of PPE Decrement",
        "description": "The serial number of PPE decrement",
        "indication": "C..60",
        "note": "It can be the serial number or the number of document"
    },
    "040902": { "name": "Date of PPE Decrement",
        "description": "The date of PPE decrement",
        "indication": "C8",
        "note": "   'YYYYMMDD' according to the ISO 8601:2000"
    },
    "040903": { "name": "Amount of PPE Decrement",
        "description": "The amount of PPE decrement",
        "indication": "D20.6"
    },
    "040904": { "name": "Decrement of PPE Historical Cost",
        "description": "The decrement of PPE historical cost",
        "indication": "D20.2"
    },
    "040905": { "name": "Decrement of PPE Accumulated Depreciation",
        "description": "The decrement of PPE accumulated depreciation",
        "indication": "D20.2"
    },
    "040906": { "name": "Impairment Provision of Decrement of PPE",
        "description": "The impairment provision of decrement of PPE",
        "indication": "D20.2"
    },
    "040907": { "name": "Residual Value of Decrement of PPE",
        "description": "The residual value of decrement of PPE",
        "indication": "D20.2"
    },
    "040908": { "name": "Revenue of PPE Disposal",
        "description": "The revenue generated during the process of PPE disposal",
        "indication": "D20.2"
    },
    "040909": { "name": "Expense of PPE Disposal",
        "description": "The expense generated during the process of PPE disposal",
        "indication": "D20.2"
    },
    "040910": { "name": "Reason for PPE Decrement",
        "description": "The reason for decrement of PPE",
        "indication": "C..200"
    },
    "041101": { "name": "Serial Number of Changes in PPE",
        "description": "The serial number of the record of changes in PPE",
        "indication": "C..60"
    },
    "041102": { "name": "Date of Changes in PPE",
        "description": "The date of the change of PPE",
        "indication": "C8",
        "note": "'YYYYMMDD' according to ISO 8601:2000."
    },
    "041103": { "name": "Method or Value before Changes in PPE",
        "description": "The method or value before changes in PPE",
        "indication": "C..60",
        "note": "e.g., before changes in PPE, 'straight line method' was used or the historical cost was '10000'"
    },
    "041104": { "name": "Method or Value after Changes in PPE",
        "description": "The method or value after changes in PPE",
        "indication": "C..60",
        "note": "e.g., after changes in PPE, 'double declining balance method' is used or the historical cost becomes '20000'"
    },
    "041105": { "name": "Reason for Changes in PPE",
        "description": "The reasons for changes in PPE",
        "indication": "C..200"
    },
    "050101": { "name": "Payroll Year,",
        "description": "The year number of payment to employees",
        "indication": "C4",
        "note": "e.g. '2008'"
    },
    "050102": { "name": "Number of Payroll Period",
        "description": "The period number of payroll, usually by monthly payment",
        "indication": "C..2",
        "note": "e.g., '3' means March"
    },
    "050103": { "name": "Beginning Date of Payroll Period",
        "description": "The beginning date of payroll period",
        "indication": "C8",
        "note": "'YYYYMMDD' according to ISO 8601:2000"
    },
    "050104": { "name": "Ending Date of Payroll Period",
        "description": "The ending date of payroll period",
        "indication": "C8",
        "note": "'YYYYMMDD' according to ISO 8601:2000"
    },
    "050201": { "name": "Name of Payroll Category",
        "description": "The categories are defined depending on the different types of employees and different payment time",
        "indication": "C..60",
        "note": "e.g., 'senior executive compensation' and 'piecework compensation' may be considered as two different categories, and different payroll categories can be operated by different persons"
    },
    "050202": { "name": "Code of Payroll Item",
        "description": "The code of payroll item",
        "indication": "C..60",
        "note": "e.g. '001'"
    },
    "050203": { "name": "Name of Payroll Item",
        "description": "The name of payroll item",
        "indication": "C..60",
        "note": "e.g., 'basic salary', 'bonus', 'deduction' etc."
    },
    "050301": { "name": "Employee Type",
        "description": "The employee type",
        "indication": "C..60",
        "note": "According to needs of staff management"
    },
    "050401": { "name": "Payroll Amount",
        "description": "The amount of current payroll payment",
        "indication": "D20.2"
    }
}

def file_path(pathname):
    if '/' == pathname[0:1]:
        return pathname
    else:
        dir = os.path.dirname(__file__)
        new_path = os.path.join(dir, pathname)
        return new_path

if __name__ == '__main__':
    # Create the parser
    parser = argparse.ArgumentParser(prog='24589.1',
                                     usage='%(prog)s',
                                     description='Create GV/T 24589.1 json files')
    # Add the arguments
    # parser.add_argument('-o', '--outfile')
    # args = parser.parse_args()
    # current_path = file_path('/')
    # pre, ext = os.path.splitext(current_path)
    dir = os.path.dirname(__file__)
    abie_file = dir+'/list-GB-abie.json'
    entity_file = dir+'/list-GB-entity.json'

    abie_list = []
    entity_list = []
    n = 0
    for k, v in table.items():
        module_id = k[:1]
        module_name = module[module_id]
        table_name = v['name']
        abie = {
            'Module': module_name,
            'Kind': 'ABIE',
            'Table': table_name,
            'Name': '',
            'Level': '',
            'DictionaryEntryName': 'GB_ '+table_name+'. Details',
            'Description': '',
            'ObjectClassTermQualifier': 'GB',
            'ObjectClassTerm': table_name
        }
        abie_list.append(abie)

        i = 0
        field = v['field']
        for key, val in field.items():
            element_id = key
            data = element[element_id]
            entity_name = data['name']
            description = ''
            if 'description' in data and data['description']:
                description += data['description']
            if 'note' in data and data['note']:
                description += ' Note:'+data['note']
            indication = data['indication']
            # Indication of data elements: the representation of category and length of the data element value, according to the requirements of GB/T 18142-2000, specifically as follows:
            # -- C indicates numbers, letters, characters and other characters, etc.
            # -- C n indicates an n-bit fixed-length character
            # -- C..n indicates a variable length of up to n-character
            # -- I..n indicates that up to n-bit integer calculable form
            # -- Dw.d indicates decimal calculable form. W indicates the maximum character digits containing the entire field up to the character bits before and after the decimal point. D indicates the maximum character digits after the decimal point.
            propertyTerm = entity_name
            representationTerm = ''
            DEN = 'GB_ '+table_name+'. '+entity_name
            length = None
            if 'D' == indication[:1]:
                length = indication[1:indication.index('.')]
                length = int(length)
                if 20 == length:
                    if 'Quantity' in entity_name:
                        representationTerm = 'Quantity'
                    else:
                        representationTerm = 'Amount'
                else:
                    representationTerm = 'Rate'
            elif '.' == indication[1]:
                length = indication[3:]
                length = int(length)
                if length > 100:
                    representationTerm = 'Text'
                else:
                    representationTerm = 'Identifier'
            elif 'C' == indication[0]:
                length = indication[1:]
                length = int(length)
                if 1 == length:
                    representationTerm = 'Indicator'
                elif 8 == length:
                    representationTerm = 'Date'
                else:
                    representationTerm = 'Code'
            n += 1
            i += 1
            kind = 'BBIE'
            if 1 == i:
                kind = 'IDBIE'
                propertyTerm = 'Identification'
                representationTerm = 'Identifier'
                DEN = 'GB_ '+table_name+'. ID'
            entity = {
                'num': n,
                'Module': module_name,
                'Kind': kind,
                'Table': table_name,
                'No': i,
                'Name': entity_name,
                'Level': 1,
                'DataType': indication,
                'Length': length,
                'DictionaryEntryName': DEN,
                'Description': description,
                'ObjectClassTermQualifier': 'GB',
                'ObjectClassTerm': table_name,
                'PropertyTerm': propertyTerm,
                'RepresentationTerm': representationTerm
            }
            entity_list.append(entity)

    with open(abie_file, 'w') as f:
        json.dump({'data': abie_list}, f, indent=4)

    with open(entity_file, 'w') as f:
        json.dump({'data': entity_list}, f, indent=4)

    print('done.')
