class Api::BillsController < ApplicationController
  def create
    @bill = Bill.new(bill_params)
    if @bill.record(params[:bill_shares])
      render :show
    else
      render json: @bill.errors.full_messages, status: 422
    end
  end

  def index
    @bills = current_user.bills
    render :index
  end

  def show
    @bill = Bill.find(params[:id])
    render :show
  end

  def update
    # updating bill must update bill shares and debts as well
    # @bill = Bill.find(params[:id])
    # if @bill.update_attributes(bill_params)
    #   render :show
    # elsif @bill
    #   render json: ["Could not perform action"], status: 422
    # else
    #   render json: ["Could not find bill"], status: 404
    # end
  end

  def destroy
    @bill = Bill.find(params[:id])
    if @bill
      @bill.destroy
      render :show
    else
      render json: @bill.errors.full_messages, status: 422
    end
  end

  private
  def bill_params
    params.require(:bill).permit(:category, :description, :total, :date, :notes)
  end
end
