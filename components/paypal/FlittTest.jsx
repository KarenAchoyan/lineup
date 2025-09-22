"use client";
import React, { useState, useEffect } from 'react';

const FlittTest = () => {
    const [scriptStatus, setScriptStatus] = useState('Loading...');
    const [checkoutAvailable, setCheckoutAvailable] = useState(false);

    useEffect(() => {
        const testScriptUrls = [
            'https://pay.flitt.com/latest/checkout-vue/checkout.js',
            'https://checkout.flitt.com/checkout.js',
            'https://pay.flitt.com/checkout.js'
        ];

        const testScript = (url) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = url;
                script.async = true;
                script.onload = () => resolve(url);
                script.onerror = () => reject(url);
                document.head.appendChild(script);
            });
        };

        const testAllScripts = async () => {
            for (const url of testScriptUrls) {
                try {
                    await testScript(url);
                    setScriptStatus(`✅ Script loaded successfully from: ${url}`);
                    setCheckoutAvailable(!!window.checkout);
                    break;
                } catch (error) {
                    setScriptStatus(`❌ Failed to load from: ${url}`);
                }
            }
        };

        testAllScripts();
    }, []);

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Flitt Script Test</h3>
            <div className="space-y-2">
                <p><strong>Script Status:</strong> {scriptStatus}</p>
                <p><strong>Checkout Function Available:</strong> {checkoutAvailable ? '✅ Yes' : '❌ No'}</p>
                <p><strong>Window.checkout:</strong> {window.checkout ? '✅ Available' : '❌ Not Available'}</p>
            </div>
            
            <div className="mt-4">
                <h4 className="font-semibold mb-2">Test URLs:</h4>
                <ul className="text-sm space-y-1">
                    <li>• https://pay.flitt.com/latest/checkout-vue/checkout.js</li>
                    <li>• https://checkout.flitt.com/checkout.js</li>
                    <li>• https://pay.flitt.com/checkout.js</li>
                </ul>
            </div>

            <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
                Reload Page
            </button>
        </div>
    );
};

export default FlittTest;
