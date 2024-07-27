# Dynamic form test cases

## Test case 1

```json
{
    "form_header": "Sales Information Form",
    "fields": [
        {
            "section": 1,
            "section_name": "Customer Details",
            "field_id": "customer_name",
            "field_label": "Customer Name",
            "field_type": "text",
            "validations": ["required", "alphabets"],
            "info": "Full name of the customer"
        },
        {
            "section": 1,
            "section_name": "Customer Details",
            "field_id": "customer_email",
            "field_label": "Customer Email",
            "field_type": "text",
            "validations": ["required", "email"],
            "info": "Email address of the customer"
        },
        {
            "section": 2,
            "section_name": "Product Information",
            "field_id": "product_name",
            "field_label": "Product Name",
            "field_type": "text",
            "validations": ["required"],
            "info": "Name of the product being sold"
        },
        {
            "section": 2,
            "section_name": "Product Information",
            "field_id": "quantity",
            "field_label": "Quantity",
            "field_type": "number",
            "validations": ["required", "positive_number"],
            "info": "Quantity of the product"
        },
        {
            "section": 3,
            "section_name": "Payment Details",
            "field_id": "total_amount",
            "field_label": "Total Amount",
            "field_type": "text",
            "validations": ["required", "currency"],
            "info": "Total amount for the transaction"
        },
        {
            "section": 3,
            "section_name": "Payment Details",
            "field_id": "payment_method",
            "field_label": "Payment Method",
            "field_type": "checkbox",
            "field_options": [{"value": "credit_card", "label": "Credit Card"}, {"value": "cash", "label": "Cash"}],
            "validations": ["required"],
            "info": "Select the payment method"
        }
    ]
}

```

## Test case 2

```json
{
    "form_header": "Logistics Information Form",
    "fields": [
        {
            "section": 1,
            "section_name": "Shipment Details",
            "field_id": "tracking_number",
            "field_label": "Tracking Number",
            "field_type": "text",
            "validations": ["required", "alphanumeric"],
            "info": "Tracking number of the shipment"
        },
        {
            "section": 1,
            "section_name": "Shipment Details",
            "field_id": "shipment_date",
            "field_label": "Shipment Date",
            "field_type": "text",
            "validations": ["required", "date"],
            "info": "Date of shipment"
        },
        {
            "section": 2,
            "section_name": "Recipient Information",
            "field_id": "recipient_name",
            "field_label": "Recipient Name",
            "field_type": "text",
            "validations": ["required", "alphabets"],
            "info": "Full name of the recipient"
        },
        {
            "section": 2,
            "section_name": "Recipient Information",
            "field_id": "delivery_address",
            "field_label": "Delivery Address",
            "field_type": "textarea",
            "validations": ["required"],
            "info": "Delivery address of the recipient"
        },
        {
            "section": 3,
            "section_name": "Status Update",
            "field_id": "status",
            "field_label": "Status",
            "field_type": "select",
            "field_options": [
                {"value": "in_transit", "label": "In Transit"}, {"value": "delivered", "label": "Delivered"},
                {"value": "dispatched", "label": "Dispatched"}, {"value": "undelivered", "label": "Undelivered"}],
            "validations": ["required"],
            "info": "Select the current status of the shipment"
        },
        {
            "section": 3,
            "section_name": "Status Update",
            "field_id": "update_comments",
            "field_label": "Update Comments",
            "field_type": "textarea",
            "validations": [],
            "info": "Provide any additional comments or updates"
        },
        {
            "section": 3,
            "section_name": "Status Update",
            "field_id": "update_comments",
            "field_label": "Delivery Comments",
            "field_type": "textarea",
            "validations": [],
            "info": "Provide any additional comments or updates"
        }
    ]
}


## Test case 3
```json
{
    "form_header": "Tax Filing Information",
    "fields": [
        {
            "section": 1,
            "section_name": "Personal Information",
            "field_id": "full_name",
            "field_label": "Full Name",
            "field_type": "text",
            "validations": ["required", "alphabets"],
            "info": "Your full name"
        },
        {
            "section": 1,
            "section_name": "Personal Information",
            "field_id": "social_security_number",
            "field_label": "Social Security Number",
            "field_type": "text",
            "validations": ["required", "numeric"],
            "info": "Your social security number"
        },
        {
            "section": 2,
            "section_name": "Income Information",
            "field_id": "annual_income",
            "field_label": "Annual Income",
            "field_type": "number",
            "validations": ["required", "positive"],
            "info": "Your annual income"
        },
        {
            "section": 2,
            "section_name": "Income Information",
            "field_id": "tax_withheld",
            "field_label": "Tax Withheld",
            "field_type": "number",
            "validations": ["required", "positive"],
            "info": "Amount of tax withheld"
        },
        {
            "section": 3,
            "section_name": "Deductions",
            "field_id": "mortgage_interest",
            "field_label": "Mortgage Interest",
            "field_type": "number",
            "validations": ["required", "positive"],
            "info": "Amount of mortgage interest paid"
        },
        {
            "section": 3,
            "section_name": "Deductions",
            "field_id": "charitable_contributions",
            "field_label": "Charitable Contributions",
            "field_type": "number",
            "validations": ["required", "positive"],
            "info": "Amount of charitable contributions made"
        }
    ]
}
