from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import joblib
import os
from tensorflow.keras.models import load_model
from sklearn.preprocessing import MinMaxScaler


app = Flask(__name__)
CORS(app)

script_dir = os.path.dirname(__file__)

def get_csv_path(city):
    if city == 'Auckland':
        return os.path.join(script_dir, 'auckland_data.csv')
    elif city == 'Wellington':
        return os.path.join(script_dir, 'wellington_data.csv')
    elif city == 'Christchurch':
        return os.path.join(script_dir, 'christchurch_data.csv')


@app.route('/get_features', methods=['GET'])
def get_features():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    city = request.args.get('city')

    start_date = pd.to_datetime(start_date)
    end_date = pd.to_datetime(end_date)

    csv_file_path = get_csv_path(city)

    if csv_file_path is None:
        return jsonify({'error': 'Unknown city'})

    df = pd.read_csv(csv_file_path, parse_dates=['Date'])

    filtered_data = df[(df['Date'] >= start_date) & (df['Date'] <= end_date)]

    result_list = []

    for _, row in filtered_data.iterrows():
        result_dict = row.to_dict()
        result_dict = {key: None if pd.isna(value) else value.item() if isinstance(value, pd.Series) else value for key, value in result_dict.items()}
        result_dict['Date'] = row['Date'].strftime('%Y-%m-%d')
        result_list.append(result_dict)

    return jsonify(result_list)

model_paths = {
    'Auckland': 'Auckland_model.h5',
    'Wellington': 'Wellington_model.h5',
    'Christchurch': 'Christchurch_model.h5',
}
input_scaler_paths = {
    'Auckland': 'Auckland_input_scaler.pkl',
    'Wellington': 'Wellington_input_scaler.pkl',
    'Christchurch': 'Christchurch_input_scaler.pkl',
}

output_scaler_paths = {
    'Auckland': 'Auckland_output_scaler.pkl',
    'Wellington': 'Wellington_output_scaler.pkl',
    'Christchurch': 'Christchurch_output_scaler.pkl',
}
input_scaler = None
output_scaler = None
city = None

@app.route('/api/predictAirQuality', methods=['POST'])
def predict_air_quality():
    try:
        global input_scaler
        global output_scaler
        global city

        input_data = request.get_json()
        city = input_data['city']
        model = load_model(model_paths[city])
        input_scaler = joblib.load(input_scaler_paths[city])
        output_scaler = joblib.load(output_scaler_paths[city])

        features = [
            input_data['Date'],
            input_data['WDir'],
            input_data['WSpd'],
            input_data['Rain'],
            input_data['RH'],
            input_data['Tmax'],
            input_data['Tmin'],
            input_data['lightCount'],
            input_data['heavyCount'],
            
        ]
        features = np.array(features).reshape(1, -1)

        input_data_scaled = input_scaler.transform(features)
        input_data_scaled_reshaped = input_data_scaled.reshape((1, -1, 1))
        predictions = model.predict(input_data_scaled_reshaped)
        predictions_inversed = output_scaler.inverse_transform(predictions)

        print(features)
        predictions_list = predictions_inversed.tolist()
        pm25, pm10 = predictions_list[0]
        result_dict = {'city': city, 'pm2.5': pm25, 'pm10': pm10}
        return jsonify({'prediction': result_dict})


    except Exception as e:
        print('Error:', str(e))
        return jsonify({'success': False, 'error': 'Internal server error'}), 500


pro_model_paths = {
    'Auckland': 'Auckland_pro.h5',
    'Wellington': 'Wellington_pro.h5',
    'Christchurch': 'Christchurch_pro.h5',
}
pro_input_scaler_paths = {
    'Auckland': 'Auckland_input_scaler_pro.pkl',
    'Wellington': 'Wellington_input_scaler_pro.pkl',
    'Christchurch': 'Christchurch_input_scaler_pro.pkl',
}

pro_output_scaler_paths = {
    'Auckland': 'Auckland_output_scaler_pro.pkl',
    'Wellington': 'Wellington_output_scaler_pro.pkl',
    'Christchurch': 'Christchurch_output_scaler_pro.pkl',
}
@app.route('/api/predictAirQuality/Professional', methods=['POST'])
def predict_professional_air_quality():
    try:
        global input_scaler
        global output_scaler
        global city

        input_data = request.get_json()
        city = input_data['city']
        model = load_model(pro_model_paths[city])
        input_scaler = joblib.load(pro_input_scaler_paths[city])
        output_scaler = joblib.load(pro_output_scaler_paths[city])
        if city == 'Auckland' :
            features = [
                input_data['Date'],
                input_data['NOx'],
                input_data['O3'],
                input_data['SO2'],
                input_data['WDir'],
                input_data['WSpd'],
                input_data['GDir'],
                input_data['gSpd'],
                input_data['wRun'],
                input_data['Rain'],
                input_data['tDry'],
                input_data['tWet'],
                input_data['RH'],
                input_data['Tmax'],
                input_data['Tmin'],
                input_data['Tgmin'],
                input_data['ET10'],
                input_data['ET20'],
                input_data['ET100'],
                input_data['Pmsl'],
                input_data['Pstn'],
                input_data['Sun'],
                input_data['Rad'],
                input_data['lightCount'],
                input_data['heavyCount'],
                input_data['Month'],
                input_data['DayofWeek'],
                input_data['weekend'],
            ]
        elif city == 'Christchurch':
            features = [
                input_data['Date'],
                input_data['CO'],
                input_data['NO'],
                input_data['NO2'],
                input_data['SO2'],
                input_data['WDir'],
                input_data['WSpd'],
                input_data['GDir'],
                input_data['gSpd'],
                input_data['wRun'],
                input_data['Rain'],
                input_data['tDry'],
                input_data['tWet'],
                input_data['RH'],
                input_data['Tmax'],
                input_data['Tmin'],
                input_data['Pmsl'],
                input_data['Pstn'],
                input_data['Rad'],
                input_data['lightCount'],
                input_data['heavyCount'],
            ]
        else :
            features = [
                input_data['Date'],
                input_data['NO2'],
                input_data['O3'],
                input_data['CO'],
                input_data['WDir'],
                input_data['WSpd'],
                input_data['GDir'],
                input_data['gSpd'],
                input_data['wRun'],
                input_data['Rain'],
                input_data['tDry'],
                input_data['tWet'],
                input_data['RH'],
                input_data['Tmax'],
                input_data['Tmin'],
                input_data['Tgmin'],
                input_data['ET10'],
                input_data['ET20'],
                input_data['ET100'],
                input_data['Pmsl'],
                input_data['Pstn'],
                input_data['Sun'],
                input_data['Rad'],
                input_data['lightCount'],
                input_data['heavyCount'],
            ]
        features = np.array(features).reshape(1, -1)

        input_data_scaled = input_scaler.transform(features)
        input_data_scaled_reshaped = input_data_scaled.reshape((1, -1, 1))
        predictions = model.predict(input_data_scaled_reshaped)
        predictions_inversed = output_scaler.inverse_transform(predictions)

        predictions_list = predictions_inversed.tolist()
        print(predictions_list)
        if city == 'Auckland':
            pm10, pm25,AQI = predictions_list[0]
            result_dict = {'city': city, 'pm10': pm10, 'pm2.5': pm25, 'AQI' : AQI}

        else:
            pm10, pm25= predictions_list[0]
            result_dict = {'city': city, 'pm10': pm10, 'pm2.5': pm25}
        return jsonify({'prediction': result_dict})

    except Exception as e:
        print('Error:', str(e))
        return jsonify({'success': False, 'error': 'Internal server error'}), 500


if __name__ == '__main__':
    app.run(port=3002)
