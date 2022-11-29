const express = require('express')
const nunjucks = require('nunjucks');
var app = express();
var wkhtmltopdf = require('wkhtmltopdf');
const fs = require('fs');

const pdf_generate = async (req, res) => {
    const order = {
        _links: { self: [[Object]], collection: [[Object]] },
        shipping: {
            first_name: '',
            last_name: '',
            company: '',
            address_1: '',
            address_2: '',
            city: '',
            state: '',
            postcode: '',
            country: ''
        },
        billing: {
            first_name: 'Revatee',
            last_name: 'Pawar',
            company: '',
            address_1: '5 Sandesh Society',
            address_2: 'Bunglow No 5',
            city: 'Pune',
            state: 'MH',
            postcode: '411037',
            country: '',
            email: 'revateepawar21@gmail.com',
            phone: '8668611295'
        }, _id: "637c38def3cd82de25fa504a",
        id: 314367,
        parent_id: 0,
        number: '314367',
        order_key: 'wc_order_ckjlxi5D89DxW',
        created_via: 'checkout',
        version: '7.1.0',
        status: 'completed',
        currency: 'INR',
        date_created: '2022-11-22T08:17:03',
        date_created_gmt: '2022-11-22T02:47:03',
        date_modified: '2022-11-23T09:53:20',
        date_modified_gmt: '2022-11-23T04:23:20',
        discount_total: '19.90',
        discount_tax: '0.00',
        shipping_total: '39.00',
        shipping_tax: '0.00',
        cart_tax: '0.00',
        total: '218.10',
        total_tax: '0.00', date_paid_gmt: null,
        date_completed: null,
        date_completed_gmt: null, line_items: [
            {
                id: 229462,
                name: 'Puranpoli - 5 pieces',
                product_id: 16,
                variation_id: 17,
                quantity: 1,
                tax_class: '',
                subtotal: '199.00',
                subtotal_tax: '0.00',
                total: '179.10',
                total_tax: '0.00',
                sku: 'PK-PUPOLI-5U',
                price: 179.1,
                meta_data: [Array],
                taxes: [],
                _id: ("637df3e0f0057f134952f284")
            }
        ],
    };

    nunjucks.configure('views', {
        autoescape: true,
        express: app
    });
    const data = nunjucks.render('invoice.html', { order_no: order.id, first_name: order.billing.first_name, last_name: order.billing.last_name, address_1: order.billing.address_1, address_2: order.billing.address_2, postcode: order.billing.postcode, phone: order.billing.phone, invoice_date: order.date_created, payment_terms: "??", due_date: "??", order: order.line_items });
    wkhtmltopdf.command = 'C:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe';
    // var file = fs.createReadStream('./source/template/invoice/output.pdf');
    wkhtmltopdf(data, {
        output: 'out.pdf', pageSize: 'letter'
    }).on('close', () => {
        var data1 = fs.readFileSync('./out.pdf');
        res.contentType("application/pdf");
        res.send(data1);
    }).on('error', (e) => console.log(e));

}
module.exports = pdf_generate;
